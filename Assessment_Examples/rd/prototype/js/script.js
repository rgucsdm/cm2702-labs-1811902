$(function(){
	// usual main starting point when web page loads

$( "#homeButton" ).click(function() {
  $( "#circleInterface" ).fadeIn( "slow", "linear" );
  $( '#circleInterface' ).promise().done(function() {
    $('#mapBox').fadeOut( "fast", "linear" );
      $("#aboutPage").fadeOut( "fast", "linear" );
  });
});

$( "#aboutButton" ).click(function() {
  $( "#aboutPage" ).fadeIn( "slow", "linear" );
  $( '#aboutButton' ).promise().done(function() {
    $('#mapBox').fadeOut( "fast", "linear" );
      $("#circleInterface").fadeOut( "fast", "linear" );
  });
});

$( "#mapButton" ).click(function() {
  $( "#mapBox" ).fadeIn( "slow", "linear" );
 // $(window.map).resize(); // This prevents the map from resetting to a small width.
  $( '#mapButton' ).promise().done(function() {
    $("#aboutPage").fadeOut( "fast", "linear" );
      $("#circleInterface").fadeOut( "fast", "linear" );

  });
});

//This is to prevent from showing the map on the same "page" of the circle interface.
if ($('#circleInterface').is(":visible")) {
  $('#mapBox').fadeOut( "fast", "linear" );
    $("#aboutPage").fadeOut( "fast", "linear" );
}
//thats changing "active" element in navbar on click
$(".navbar-nav a").on("click", function(){
   $(".navbar-nav").find(".active").removeClass("active");
   $(this).addClass("active");
});

});
