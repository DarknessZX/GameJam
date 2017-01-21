
$(document).on("creating", function() {
  Fishing.game.eventHandler = {
    click: function(e) {
      if(!Fishing.game.paused) {

      }
    },
    keyPress: function(e) {
      if(!Fishing.game.paused) {
        if(e.keyCode == 32){ // Spacebar
          
        }
      }
    },
    hit: function(e) {
      if(!Fishing.game.paused) {

      }
    },
    miss: function(e) {
      if(!Fishing.game.paused) {

      }
    },
    mouseMove: function(e) {
      if(!Fishing.game.paused) {
          console.log("move cc");
      }
    },
    success: function(e) {
      if(!Fishing.game.paused) {

      }
    },
    fail: function(e) {
      if(!Fishing.game.paused) {

      }
    }
  };
   //on powering
  $("canvas").on("click",      Fishing.game.eventHandler.click);
  //on Release power
  $(document).on("keypress",   Fishing.game.eventHandler.keyPress); //including press space
  $("canvas").on("hit",        Fishing.game.eventHandler.hit);
  $("canvas").on("miss",       Fishing.game.eventHandler.miss);
  //on Pulling
  $(document).on("mousemove",  Fishing.game.eventHandler.mouseMove);
  $("canvas").on("success",    Fishing.game.eventHandler.success);
  $("canvas").on("fail",       Fishing.game.eventHandler.fail);
})
