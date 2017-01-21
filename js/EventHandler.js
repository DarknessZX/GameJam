
$(document).on("creating", function() {
  Fishing.game.eventHandler = {
    click: function(e) {
      if(!Fishing.game.paused) {
        //stop tween hook rotation
      }
    },
    keyPress: function(e) {
      if(!Fishing.game.paused) {
         // Spacebar
        if(e.keyCode == 32){
          //start rod animation
        }
      }
    },
    hit: function(e) {
      if(!Fishing.game.paused) {
        //start twerk like neighbors from hell >> twerking
      }
    },
    miss: function(e) {
      if(!Fishing.game.paused) {
        //show "miss" message, come back like normal
      }
    },
    mouseMove: function(e) {
      if(!Fishing.game.paused) {
        // on twerking
      }
    },
    success: function(e, wave) {
      if(!Fishing.game.paused) {
        // start fish animation, fish come up from water
        Fishing.fishController.get("fish1", wave.position);
      }
    },
    fail: function(e) {
      if(!Fishing.game.paused) {
        //show "fail" message, come back like normal
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

  Fishing.wavesGroup.children.forEach(function(child) {
    $("canvas").trigger("success", [child]);
  })
})
