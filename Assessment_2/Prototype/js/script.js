$(function() {
  
  /* MATCH DATA - DB SIMULATION */
  
  
  
  /* PREDICTIONS */
  
  /* Buttons - predict match outcome */
  $(".btn-group>button").click(function() {
    var btnClicked = event.target;
    var matchID = $(this).parent().parent().attr("id");
    $(btnClicked).addClass("selected");
  
    $("#"+matchID+">.btn-group").children().each(function() {
      if(this.name != btnClicked.name) {
        $(this).removeClass("selected");
      }
    });
    console.log("clicked " + btnClicked.name + " in " + matchID);
    displayDraw(btnClicked, matchID);
  });
  
  /* Display select winner option when DRAW is selected */
  function displayDraw(btnClicked, matchID) {
    if(btnClicked.name == "Draw") {
      //var matchID = $(btnClicked).parent().parent().attr("id");
      $("#"+ matchID + ">select").css("visibility", "visible");
      console.log("you said it's a draw in " + matchID);
    }
    else {
      $("#"+ matchID + ">select").css("visibility", "hidden");
    }; 
  }
  

}); /* end of document ready */