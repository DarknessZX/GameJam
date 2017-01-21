
$(document).on("creating", function() {
  Fishing.game.eventHandler = {
    click: function(e) {
      if(!Fishing.game.paused) {
        //stop tween hook rotation
        Fishing.powerBar.resume();
        // Fishing.fishingHook.pause();
        Fishing.state = "Click";
      }
    },
    keyPress: function(e) { //power, origin, angle
      if(!Fishing.game.paused) {
         // Spacebar
         Fishing.powerBar.pause();
        if(Fishing.state == "Click") {
          if(e.keyCode == 32){
            var origin = Fishing.boat.position;
            var power = Fishing.powerBar.mask.position.x;
            var angle = Fishing.fishingHook.angle;
            console.log(origin, power, angle);
            Fishing.state = "SpacePress";
            //calcul
            // console.log({x: origin.x + power * Math.sin(angle), y: origin.y + power * Math.cos(angle)});
            Fishing.fishController.get("fish1", new Phaser.Point(origin.x + power * Math.sin(angle), origin.y + power * Math.cos(angle)));
            //run animation hook rod
          }
        }
      }
    },
    hit: function(e,wave) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "SpacePress") {

        }
        //start twerk like neighbors from hell >> twerking
          //console.log(wave);
          Fishing.fishingLine.setHitLine(wave.position);
      }
    },
    miss: function(e) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "SpacePress") {

        }
        //show "miss" message, come back like normal
      }
    },
    mouseMove: function(e) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "Hit") {

        }
        // on twerking
      }
    },
    success: function(e, wave) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "MouseMove") {

        }
        // start fish animation, fish come up from water
      }
    },
    fail: function(e) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "MouseMove") {

        }
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
