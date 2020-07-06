      //our map is using Mapbox API - https://www.mapbox.com/

      var called = false; // to control calls to randomMarker method
      if (!mapboxgl.supported()) {
        alert('Your browser does not support Mapbox GL - OUR MAP WONT\'T WORK');
      } else {
        //basic map settings
        mapboxgl.accessToken = 'pk.eyJ1Ijoidm9sZGlnIiwiYSI6ImNqcnkzY25wZjBvcmM0NG9jdncybmd5cTQifQ.1OIcdR85QpsmyPALkbNRGA';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/voldig/cjry5ef0b1ii91fqmgcx3tm77',//this style was specially generated to meet our needs - black map that can be viewed in the dark
            center: [-2.078393, 57.107765], //default center of map
            zoom: 3
        });


        // Add geolocate control to the map
        const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        });
        map.addControl(geolocate);

        map.on('load', function()
        {
        	geolocate.trigger();
        });
        geolocate.on('geolocate', function() {

        //Get the user location - this is needed later to get weather and set up simulated "best places for observation"
        var userlocation = geolocate._lastKnownPosition;

        var lat = userlocation.coords.latitude;
        var lng = userlocation.coords.longitude;
        console.log(lat + "    " + lng);
        getWeather(lat, lng);
        if(!called) {
          randomMarker(lat, lng);//seting up markers pointing to best view points
          called = true;
        }


        });
//this is just simulating best places for observation by seting up random places in the area of the user
function randomMarker(lat, lng){
  for(var x = 0; x < 5; x++){
    new mapboxgl.Marker()
    .setLngLat([lng + getRandomPlace(-1,1), lat - getRandomPlace(-1,1)])
    .addTo(map);
  }
}
function getRandomPlace(min, max) {
  return ((Math.random() * (max - min) ) + min) / 10;
}


//getting weather using openweathermap API
function getWeather(lat, lng){
  //we use ajax call to get data from API
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng +"&units=metric&APPID=d5aba605bd0c5d6249640df9f0b3fe18",
      type: "GET",
      dataType: "jsonp",
      success: function(data){
        console.log(data.main.temp);
        console.log(data.name)
        //documentation - https://openweathermap.org/current
        //changing values inside "circles" for temperature cloud coverage and general weather description
        $("#temp").html(data.main.temp + "&#176;C");
        $("#cloud").html(data.clouds.all + "%");
        $("#weather").html(data.weather.description + "");
      }
    })
};//end of getWeather function

}//end of else block
