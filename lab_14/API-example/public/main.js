/**
 * @Author: John Isaacs <john>
 * @Date:   12-Mar-182018
 * @Filename: main.js
 * @Last modified by:   john
 * @Last modified time: 12-Mar-182018
 */

$(function() {
  // when page ready
  //ask for json from our twitter JSON
  getTweets();
//add interval code so this runs every 60 seconds
  setInterval(getTweets, 60000);
});

function getTweets() {
  $.getJSON("/tweetsjson", function(data) {
    $('#tweetsdisplay').empty(); //clears the div
    //display the last updated time.
    $('#tweetsdisplay').append("<H3> Last Updated "+Date()+ " </h3>");
    //for every tweet create a div and append to the page
    for (var t = 0; t < data.length; t++) {
      var tweetoutput = "<div>";
      tweetoutput += "<h2>" + data[t].name + "</h2>";
      tweetoutput += "<p>" + data[t].text + "</p>";
      tweetoutput += "</div>";
      $('#tweetsdisplay').append(tweetoutput);
    }

  });
}
