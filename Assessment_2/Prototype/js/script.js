$(function() {
  
  /* PREDICTIONS */
  
  /* Assign events to buttons */
  $(".btn-group>button").click(function() {
    setPrediction(event.target);
  });
  
  $("select").change(function() {
    getDrawWinner(event.target);
  });
  
  /* Stages - accordion effect */
  $(".stage-header").click(function() {
    $(this).toggleClass("closed");
    $(this).siblings().each(function() {
      if($(this).is(":hidden")){
        console.log("Hidden");
      }
      $(this).slideToggle();
    });   
  });
  

  

}); /* end of document ready */


/* Returns home team of a given match */
function getHomeTeam(matchID) {
  var homeTeam = $("#" + matchID).find(".home-team>p").text();
  return homeTeam;
}

/* Returns away team of a given match */
function getAwayTeam(matchID) {
  var awayTeam = $("#" + matchID).find(".away-team>p").text();
  return awayTeam;
}

/* Returns draw winner selection of a given match */
function getSelectedTeam(matchID){
  var winner = "Country";
  var optionSelected = $("#" + matchID).find("select option:selected").value;
  if (optionSelected == "home") {
    winner = getHomeTeam(matchID);
  }
  else if (optionSelected == "away") {
    winner = getAwayTeam(matchID);
  }
  else {
    winner = "Country";
  };
  return winner;
}

/* SET MATCH WINNER PREDICTION */

function setPrediction(btnClicked) {
  var matchID = $(btnClicked).closest(".match-row").attr("id");
  console.log("clicked " + btnClicked.name + " in " + matchID); // temporary test
  styleSelectedButton(btnClicked, matchID);
  if(btnClicked.name == "Draw") {
    displayDraw(btnClicked, matchID);
    populateNextStage(matchID, getSelectedTeam(matchID));
  }
  else {
    hideDraw(btnClicked, matchID);
    populateNextStage(matchID, getWinner(btnClicked, matchID));
  }  
}

/* Styles selected prediction button */
function styleSelectedButton(btnClicked, matchID) {
  $(btnClicked).addClass("selected");
  $("#" + matchID).find(".btn-group").children().each(function() {
    if(this.name != btnClicked.name) {
      $(this).removeClass("selected");
    }
  });
}

/* Display "select winner" option when DRAW is selected */
function displayDraw(btnClicked, matchID) {
  populateDrawTeams(matchID);
  $("#" + matchID).find("select").css("visibility", "visible");
  console.log("home value is: "+ $("#" + matchID).find("select option[value='home']").html()); //temporary test
  console.log("away value is: "+ $("#" + matchID).find("select option[value='away']").html()); //temporary test
}

/* Hide "select winner" option when DRAW is not selected */
function hideDraw(btnClicked, matchID) {
  $("#" + matchID).find("select").css("visibility", "hidden");
}

/* Populate select options in winner drop down (DRAW prediction) */
function populateDrawTeams(matchID) {
  $("#" + matchID).find("select").val("none");
  $("#" + matchID).find("select option[value='home']").html(getHomeTeam(matchID));
  $("#" + matchID).find("select option[value='away']").html(getAwayTeam(matchID));
}

/* Determine match winner - in main time */
function getWinner(btnClicked, matchID) {
  var winner = "Country";
  if(btnClicked.name == "Home") {
    winner = getHomeTeam(matchID);
  } else if(btnClicked.name == "Away") {
    winner = getAwayTeam(matchID);
  };
  console.log("You said " + winner + " will win " + matchID); //temporary test
  return winner; 
}

/* Determine match winner - in extra time */
function getDrawWinner(optionSelected){
  var matchID = $(optionSelected).closest(".match-row").attr("id");
  var winner = "Country";
  if (optionSelected.value == "home") {
    winner = getHomeTeam(matchID);
  }
  else if (optionSelected.value == "away") {
    winner = getAwayTeam(matchID);
  }
  else {
    winner = "Country";
  };
  populateNextStage(matchID, winner);  
  console.log("You say "+ winner +" will win in ET in " + matchID); // temporary test
}


/* Populate further stages based on last16 predictions */
function populateNextStage(matchID, winner) {
  switch(matchID) {
    case "match49": $("#match57").find(".home-team>p").html(winner); break;
    case "match50": $("#match57").find(".away-team>p").html(winner); break;
    case "match51": $("#match59").find(".home-team>p").html(winner); break;
    case "match52": $("#match59").find(".away-team>p").html(winner); break; 
    case "match53": $("#match58").find(".home-team>p").html(winner); break;
    case "match54": $("#match58").find(".away-team>p").html(winner); break;
    case "match55": $("#match60").find(".home-team>p").html(winner); break;
    case "match56": $("#match60").find(".away-team>p").html(winner); break;
    case "match57": $("#match61").find(".home-team>p").html(winner); break;
    case "match58": $("#match61").find(".away-team>p").html(winner); break;
    case "match59": $("#match62").find(".home-team>p").html(winner); break;
    case "match60": $("#match62").find(".away-team>p").html(winner); break;
    case "match61":
      $("#final").find(".home-team>p").html(winner);
      $("#3rdplace").find(".home-team>p").html(getLoser(matchID, winner));
      break;
    case "match62":
      $("#final").find(".away-team>p").html(winner);
      $("#3rdplace").find(".away-team>p").html(getLoser(matchID, winner));
      break;
    default: console.log("not yet defined");
  };
}

/* Returns loser of a given match */
function getLoser(matchID, winner) {
  var loser;
  if(winner == getHomeTeam(matchID)) {
    loser = getAwayTeam(matchID);
  }
  else {
    loser = getHomeTeam(matchID);
  }
  return loser;
}



