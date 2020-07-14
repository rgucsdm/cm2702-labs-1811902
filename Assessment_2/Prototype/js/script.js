$(function() {
  
  /* PREDICTIONS */
  
  /* Assign events to buttons */
  
  $(".btn-group>button").click(function() {
    var btnClicked = event.target;
    setWinner(btnClicked);
  });

}); /* end of document ready */


/* SET MATCH WINNER PREDICTION */
function setWinner(btnClicked) {
  var matchID = $(btnClicked).closest(".match-row").attr("id");
  $(btnClicked).addClass("selected");
  $("#" + matchID).find(".btn-group").children().each(function() {
    if(this.name != btnClicked.name) {
      $(this).removeClass("selected");
    }
  });
  displayDraw(btnClicked, matchID);
  console.log("clicked " + btnClicked.name + " in " + matchID);
  var winner = determineWinner(btnClicked, matchID);
  populateNextStage(matchID, winner);
}


/* Display "select winner" option when DRAW is selected */
function displayDraw(btnClicked, matchID) {
  if(btnClicked.name == "Draw") {
    $("#" + matchID).find("select").css("visibility", "visible");
    console.log("you said it's a draw in " + matchID);
  } else {
    $("#" + matchID).find("select").css("visibility", "hidden");
  };
}

/* Determine match winner */
function determineWinner(btnClicked, matchID) {
  var winner = "Country";
  if(btnClicked.name == "Home") {
    winner = $("#" + matchID).find(".home-team>p").text();
  } else if(btnClicked.name == "Away") {
    winner = $("#" + matchID).find(".away-team>p").text();
  } else {
    winner = $("#" + matchID).find("option:selected").text();
  };
  console.log("You said " + winner + " will win " + matchID);
  return winner; 
}

/* Populate further stages based on last16 predictions */
function populateNextStage(matchID, winner) {
  switch(matchID) {
    case "match49":
      $("#match57").find(".home-team>p").html(winner);
      break;
    default:
      console.log("not yet defined");
  };
}



/* VARIATIONS - REMOVE FROM FINAL */
  /* Buttons - predict match outcome */
  /*$(".btn-group>button").click(function() {
    var btnClicked = event.target;
    var matchID = $(this).closest(".match-row").attr("id");
    $(btnClicked).addClass("selected");
    $("#" + matchID).find(".btn-group").children().each(function() {
      if(this.name != btnClicked.name) {
        $(this).removeClass("selected");
      }
    });
    displayDraw(btnClicked, matchID);
    console.log("clicked " + btnClicked.name + " in " + matchID);
    var winner = determineWinner(btnClicked, matchID);
    populateNextStage(matchID, winner);
  });*/