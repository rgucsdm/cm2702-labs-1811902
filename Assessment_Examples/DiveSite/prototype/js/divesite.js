/*
 *
 *  File for controlling the dive site overlay/page
 *
 */
// This section is for cycling through the images inside the imageCarousel div
var slideIndex = 1;

function resetSlideIndex(){
  slideIndex = 1;
}

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("imageContainer");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  if (x.length){
    //console.log(x);
    x[slideIndex-1].style.display = "block";
  }
}



//--------------------------------------------------------------------

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (overlayBg.style.display === 'block') {
    overlayBg.style.display = "none";
  } else {
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  overlayBg.style.display = "none";
}

//--------------------------------------------------------------------
// Review area
var overlayReviewForm = $('#overlayReviewForm');
var openButton = $('#openReviewPanelBtn');

function openReviewPanel(){
  overlayReviewForm.css({
    // visibility: 'visible',
    // maxHeight: '1000px'
    display:'flex'
  });

  openButton.hide();
}

function closeReviewPanel(){
  overlayReviewForm.css({
    // visibility: 'hidden',
    // maxHeight: '0'
    display:'none'
  });

  openButton.show();
}
