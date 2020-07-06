/*
 *
 *  File for controling the main map and displaying divesites with info and a
 *  link to the divesite overlay page
 *
 */

// Rating system for displaying stars (png) relative to what the rating is out of 5
$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

// Marker event listener for when clicked, change rating from x/5 to however many
// stars necessary
function onPopupClick(e){
  $(function(){
    $('span.stars').stars();
  });
}

/* =============================================================================
 * Leafletjs map implementation
 * =============================================================================
 */

// Leaflet js interaction below
// Creating the map object


/* =============================================================================
 * Search bar functionality
 * =============================================================================
 */

var baselayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  bounds:[[-90,-180], [90,180]] ,
  maxZoom: 20,
  minZoom: 3,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZ2F2aW5taWxsZXIyIiwiYSI6ImNqc2dkaWs3dzA1M2w0M21tdGpiZHgxY2sifQ.BtXDQXsBkPtW4VysMIHRCA',
  noWrap: true
})

var HikeBike_HikeBike = L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 20,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var baseMaps = {
    "Base": baselayer,
    "Chart": HikeBike_HikeBike,
    "Satelite": Esri_WorldImagery
};

var mymap = L.map('mapid', {
    center: [57.148543, -2.039518],
    zoom: 5,
    layers: [baselayer]
});

L.control.layers(null, baseMaps, {position:'bottomright'}).addTo(mymap);

//var mymap = L.map('mapid').setView([57.148543, -2.039518], 5);

mymap.setMaxBounds([[-90,-180], [90,180]] );


var geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
      collapsed: false
  })
  .on('markgeocode', function(e) {
      var bbox = e.geocode.bbox;
      var poly = L.polygon([
           bbox.getSouthEast(),
           bbox.getNorthEast(),
           bbox.getNorthWest(),
           bbox.getSouthWest()
      ]);
      mymap.fitBounds(poly.getBounds());

      refreshSites(); // Refresh dive sites when searching for a location in the search bar
  }).addTo(mymap);



/* =============================================================================
 * Dive site model and implementation
 * =============================================================================
 */

 // Basic model of a divesite for use when getting data from apis/mongoose for use in the map and overlay
 var DiveSite = function(id, name, shortDescription, rating, coordinates, difficulty, images, reviews){
   this.id = id;
   this.name = name;
   this.shortDescription = shortDescription;
   this.rating = rating;
   this.coordinates = coordinates;
   this.difficulty = difficulty;
   this.images = images;
   this.reviews = reviews;
 }

 var currentSites = []; // Important variable which keeps track of all currently displayed divesites

 // Function to use when creating dive site markers with some info and link
 function createDiveSiteMarker(divesite){
   rating = Math.round(divesite.rating * 4) / 4;

   var marker = L.marker(divesite.coordinates).addTo(mymap);

   marker.bindPopup("<h3>" + divesite.name + "</h3>"
                   + "<h6>" + divesite.difficulty + "</h6>"
                   + "<span class=\"stars\">" + divesite.rating + "</span>"
                   + "<p>" + divesite.shortDescription + "</p>"
                   + "<a class=\"seeMoreBtn\" href=\"#\" onclick=\"openDiveSiteOverlay("+divesite.id+")\">See more</a>");

   L.DomEvent.addListener(marker, 'click', onPopupClick);
 }

 function createDiveSite(divesite){
   var coords = [divesite.lat, divesite.lng];

   var description = divesite.description ? divesite.description : 'No current description';
   var rating = 3; // Our end, will get them when we have a db/backend
   var difficulty = 'Amateur'; // Our end, will get them when we have a db/backend

   var divesiteModel = new DiveSite(
     divesite.id,
     divesite.name,
     description,
     rating,
     coords,
     difficulty,
     [],
     [{user:'Gavin', rating:3.0, review:'Very very good, one pound fish'}, {user:'Sean', rating:3.0, review:'Very very cheap, one pound fish'}, {user:'Calum', rating:2.0, review:'Six for five pound, one pound each'}]
   );

   currentSites.push(divesiteModel);
   createDiveSiteMarker(divesiteModel);
 }

 function getCurrentDiveSite(id){
   console.log("Getting dive site with id: " + id);
   for (var i = 0; i < currentSites.length; i++) {
     console.log("Checking dive site: " + currentSites[i].id);
     if (currentSites[i].id == id){
       console.log("Dive site found id: " + id);
       return currentSites[i];
     }
   }
   console.log("No dive site found with id: " + id); // Likely not saved to array somehow, so refresh the sites
   refreshSites();
   return null;
 }

/* =============================================================================
 * Dive site page overlay
 * =============================================================================
 */
// Page overlay code
// Caching overlay elements as variables as to only find once
var diveSiteOverlay = $('#diveSiteOverlay');
var overlayImageCarousel = $('#imageCarousel');
var overlayDiveSiteTitle = $('#diveSiteTitle');
var overlayDiveSiteDescription = $('#diveSiteDescription');
var overlayReviewsContainer = $('#overlayReviewsContainer');


// Function for opening the overlay via clicking see more on a marker popup
// Parameter is the id of the dive site, used when communicating with the server
// via a get/post request in order to populate the overlay with dive site info
// and pictures
function openDiveSiteOverlay(id){
  //console.log("Dive site id: " + id);

  var site = getCurrentDiveSite(id);

  if (site){
    // If no pictures from db, scrape gImages with search url including name and save url to present pics
    var pictureURLs = [];

    // TEST PICTURES
    //pictureURLs = ["./img/examplesite.jpg","./img/examplesite1.jpg","./img/examplesite2.jpg"];
    if (site.images.length){
      // Site already has images
      for (var i = 0; i < site.images.length; i++) {
        overlayImageCarousel.append(
          "<div class=\"imageContainer\"><img class=\"diveSiteImage\" src=\"" + site.images[i].src + "\" alt=\"Picture of " + site.name + "\"><div class=\"imageOverlay\"><h2 class=\"imageCaption\">" + site.images[i].caption + "</h2></div></div>"
        );

      }

      // Moved from divesite.js to here, maybe unnecessary now or not very fast?
      $('.diveSiteImage').click(function(){
        plusDivs(1);
      });

      resetSlideIndex();

      showDivs(1);
    }
    else {
      // Site has no images available
      getFirstFiveImages(site.name, pictureURLs, function(status){
        if (status){
          overlayImageCarousel.empty();

          if (!pictureURLs.length){
            pictureURLs = [{src:"./img/examplesite.jpg", caption:"EXAMPLE PICTURE"},{src:"./img/examplesite1.jpg", caption:"EXAMPLE PICTURE"},{src:"./img/examplesite2.jpg", caption:"EXAMPLE PICTURE"}];
          }
          else {
            for (var i = 0; i < pictureURLs.length; i++) {
              overlayImageCarousel.append(
                "<div class=\"imageContainer\"><img class=\"diveSiteImage\" src=\"" + pictureURLs[i].src + "\" alt=\"Picture of " + site.name + "\"><div class=\"imageOverlay\"><h2 class=\"imageCaption\">" + pictureURLs[i].caption + "</h2></div></div>"
              );
            }
          }

          // Moved from divesite.js to here, maybe unnecessary now or not very fast?
          $('.diveSiteImage').click(function(){
            plusDivs(1);
          });

          resetSlideIndex();

          showDivs(1);
        }
        else {
          console.log('Web scrape unsuccessful?');
          // TEST PICTURES
          pictureURLs = [{src:"./img/examplesite.jpg", caption:"EXAMPLE PICTURE"},{src:"./img/examplesite1.jpg", caption:"EXAMPLE PICTURE"},{src:"./img/examplesite2.jpg", caption:"EXAMPLE PICTURE"}];
        }
      });
    }

    overlayReviewsContainer.empty();

    if (site.reviews.length){
      for (var i = 0; i < site.reviews.length; i++) {
        overlayReviewsContainer.append(
          "<article class=\"overlayReviewsReviewContainer\"><h4 class=\"overlayReviewsReviewUser\">" + site.reviews[i].user + "</h4><p class=\"overlayReviewsReviewRating\">Rating: " + site.reviews[i].rating + " / 5</p><p class=\"overlayReviewsReview\"><i>\"" + site.reviews[i].review + "\"</i></p></article>"
        );
      }
    }

    closeReviewPanel();

    overlayDiveSiteTitle.text(site.name);
    overlayDiveSiteDescription.text(site.shortDescription);

    diveSiteOverlay.height('100%');
  }
}

// Function to close the overlay, maybe remove all data too...
function closeDiveSiteOverlay(){
  diveSiteOverlay.height(0);
  overlayImageCarousel.empty();
  overlayReviewsContainer.empty();
}

/* =============================================================================
 * Ajax requests (Get list of dive sites, scrape Google Images for pictures of divesites)
 * =============================================================================
 */

function getSites(coordinates, dist){
  var location = 'lat=' + coordinates.lat.toFixed(12) + '&lng=' + coordinates.lng.toFixed(12) + '&dist=' + dist;

   $.getJSON("./../data?mode=sites&" + location, function(json){ // Try to avoid distances above 2000!

     currentSites = [];

     if(!json){
       console.log("No sites here/connection timed out");
       return;
     }

     for (var i = 0; i < json.sites.length; i++) {
       createDiveSite(json.sites[i]);
     }
   });
 }

 function getFirstFiveImages(siteName, urlArray, callback){
   $.get("./../images?sitename=" + siteName.split(' ').join('+'),function(data){ // Try to avoid distances above 2000!
     //console.log(data);

     var htmlString = $.parseHTML(data);

     //console.log(htmlObject);

     //console.log($(htmlObject).contents());

     var imgObjects = $(htmlString).contents().find('img');

     console.log(imgObjects[0].src);
     if (imgObjects.length){
       for (var i = 0; i < 5; i++) {
         console.log(imgObjects[i].src);
         if (imgObjects[i].src){
           urlArray.push({src: imgObjects[i].src, caption:"Taken from Google Images"});
           console.log("Adding image: " + imgObjects[i].src);
         }
       }
    }

    console.log("URL array: " + urlArray);

     if (urlArray.length > 0){
       callback(true);
       return;
     }

     callback(false);
     return;
   });
 }


 /* =============================================================================
  * Menu button functions (Other overlays and site refresh)
  * =============================================================================
  */
  const maxDistance = 750;

  function refreshSites(){
    console.log("Refreshing sites...");
    $('.leaflet-marker-pane').empty();
    $('.leaflet-shadow-pane').empty();

    var newCoords = mymap.getCenter();

    getSites(newCoords, maxDistance);
  }

  refreshSites();
