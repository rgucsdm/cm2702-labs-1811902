/*
 * // WARNING: DO NOT LINK THIS FILE
 *  Code in here was tested on front end and unsuccessful due to CORB/CORS errors,
 *  intended for back end, some also deprecated but kept for reference.
 *
 */



 $.getJSON("http://127.0.0.1:8080/data?mode=sites&lat=47.6031537682643&lng=-122.336164712906&dist=25",function(json){
   $.each(json, function(i){
     console.log(json[i]);
   });
 });



// $.post(
//   'http://api.divesites.com/',
//   function(data){
//     console.log(data);
//   },
//   "json"
// )
//
// $.getJSON("http://api.divesites.com")
//   .done(function(data){
//     console.log("DATA: " + data);
//   })
//   .fail(function(a, b, c){
//     var err = b + ", " + c + a;
//     console.log(err);
//   });
//
// $.getJSON("http://api.divesites.com", {mode:'sites'})
//   .done(function(data){
//     console.log("DATA: " + data);
//   })
//   .fail(function(a, b, c){
//     var err = b + ", " + c + a;
//     console.log(err);
//   });
//
// const request = new Request('http://api.divesites.com', {method:'POST'}, function(data){
//   console.log(data);
// });
// function loadDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//      console.log(this);
//     }
//   };
//   xhttp.open("GET", "http://api.divesites.com", true);
//   xhttp.send();
// }
// loadDoc();
//
// var xhr = new XMLHttpRequest();
//
// xhr.open("GET", "http://api.divesites.com", true);
//
// xhr.send();
//
// console.log(xhr.responseText);
//
// $.request('get', 'http://api.divesites.com').then(function(txt, xhr){
//   console.log(txt);
// });
//
// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//
//     // Check if the XMLHttpRequest object has a "withCredentials" property.
//     // "withCredentials" only exists on XMLHTTPRequest2 objects.
//     xhr.open(method, url, true);
//
//   } else if (typeof XDomainRequest != "undefined") {
//
//     // Otherwise, check if XDomainRequest.
//     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//
//   } else {
//
//     // Otherwise, CORS is not supported by the browser.
//     xhr = null;
//
//   }
//   return xhr;
// }
//
// var xhr = createCORSRequest('GET', 'http://api.divesites.com');
// if (!xhr) {
//   throw new Error('CORS not supported');
// }
//
// xhr.onload = function() {
//  var responseText = xhr.responseText;
//  console.log(responseText);
//  // process the response.
// };
//
// xhr.onerror = function() {
//   console.log('There was an error!');
// };
//
// xhr.send();

<div class="imageContainer" >
  <img class="diveSiteImage" src="img/examplesite.jpg" alt="Example Dive site">
  <div class="imageOverlay">
    <h2 class="imageCaption">"Write your image captions here..."</h2>
  </div>

</div>

<!-- Sidebar -->
<div class="" id="diveSiteSideBar">
  <!-- <h4 class="w3-bar-item"><b>Menu</b></h4> -->
  <a class="w3-bar-item w3-button w3-hover-black" href="#">Info</a>
  <!-- <a class="w3-bar-item w3-button w3-hover-black" href="#">Photos</a> -->
  <a class="w3-bar-item w3-button w3-hover-black" href="#">Reviews</a>
  <a class="w3-bar-item w3-button w3-hover-black" href="#">EXTRA</a>
</div>

<article class="overlayReviewsReviewContainer">
  <h4 class="overlayReviewsReviewUser">Gavin</h4>
  <p class="overlayReviewsReviewRating">Rating: 3.0/5.0</p>
  <p class="overlayReviewsReview">Very nice spot</p>
</article>

<article class="overlayReviewsReviewContainer">
  <h4 class="overlayReviewsReviewUser">Sean</h4>
  <p class="overlayReviewsReviewRating">Rating: 3.0/5.0</p>
  <p class="overlayReviewsReview"><i>"Very nice spot"</i></p>
</article>

<article class="overlayReviewsReviewContainer">
  <h4 class="overlayReviewsReviewUser">Calum</h4>
  <p class="overlayReviewsReviewRating">Rating: 3.0/5.0</p>
  <p class="overlayReviewsReview">Very nice spot</p>
</article>
