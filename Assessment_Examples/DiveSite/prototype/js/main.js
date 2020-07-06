/*
 *
 *  File for controling other menus and events on the main page
 *  (Removed old deprecated menu + search bar to replace with new search bar)
 */

// Cache the containers of which we will aniamte
var profileMenuOpen = false;
var profileContents = $('#profileContents');
var profileContainer = $('#profileContainer');
var profileButtons = $('.profileButton');

function openProfileMenu() {
  profileMenuOpen = true;
  profileButtons.hide().fadeIn(170);
  profileContents.css({
    minWidth:"100px",
    maxWidth:"100px",
    width:"100px",
    height:"130px",
    visibility:"visible"
  });
}

function closeProfileMenu() {
  profileMenuOpen = false;
  profileButtons.fadeOut(40);
  profileContents.css({

    minWidth:"0",
    maxWidth:"0",
    height:"0",
    visibility:"hidden"

  });

}

// Profile Menu toggle
function toggleProfile() {
  if (profileMenuOpen){
    closeProfileMenu();
  }
  else {
    openProfileMenu();
  }
}
