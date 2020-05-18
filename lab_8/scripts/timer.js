/**
 * @Author: John Isaacs <john>
 * @Date:   14-Feb-192019
 * @Filename: timer.js
 * @Last modified by:   john
 * @Last modified time: 14-Feb-192019
 */

/**
// Exercise 1 - DOM modification

setCountdown(10);

function setCountdown(delay) {
  
  //sets an timeout delay to display a message after the set delay
  setTimeout(function() {
    //console.log("boom")
    document.getElementById('alarmimage').src = "alarm.jpg";
    document.getElementById('alarm').innerHTML += "boom";
  }, delay * 1000);
  
  //reduces the seconds left by 1
  var secondsleft = delay - 1;
  
  //sets up an interval to fire every second
  var counter = setInterval(function() {
    //display the current seconds left
    //console.log(secondsleft--);
    document.getElementById('countdown').innerHTML = secondsleft--;
    //if we are at 0 stop the countdown
    if(secondsleft <= 0) {
      clearInterval(counter)
    }
  }, 1000);
}

*/

///**
// Exercise 2 - callback

setCountdown(10, Bam);
//setCountdown(15, Boom);
//setCountdown(17, BigBadaBoom);

 function setCountdown(delay, callback){
   //sets an timeout delay to display a message after the set delay
   setTimeout(function() {
     console.log("boom")
     callback();
   }, delay*1000);

   //reduces the seconds left by 1
   var secondsleft = delay -1;
   //sets up an interval to fire every second
   var counter = setInterval(function() {

     //display the current seconds left
     console.log(secondsleft--);

     //if we are at 0 stop the countdown
     if(secondsleft <=0){clearInterval(counter)}
   }, 1000);
 }

function Boom() {
  document.getElementById("alarm").innerHTML = "<img id='alarmimage' src='alarm.jpg'/>"
}

function Bam() {
  document.getElementById("alarm").innerHTML = "<img id='alarmimage' src='bam.jpg'/>"
}

function BigBadaBoom() {
  document.getElementById("alarm").innerHTML = "<img id='alarmimage' src='BigBadaBoom.jpg'/>"
}

//*/