
$(document).on("creating", function() {
  Fishing.game.eventHandler = {
    click: function(e) {
      if(!Fishing.game.paused) {
        //stop tween hook rotation
        Fishing.powerBar.resume();
        Fishing.fishingHook.pause();
        Fishing.state = "Click";
      }
    },
    keyPress: function(e) { //power, origin, angle
      if(!Fishing.game.paused) {
         // Spacebar
        Fishing.powerBar.pause();
        Fishing.fishingHook.alpha = 0;
        Fishing.fishingLine.graphics.clear();
        if(Fishing.state == "Click") {
          if(e.keyCode == 32){
            Fishing.fishingRod.loadAndPlay("hookRod");
            // Fishing.fishingLine.setHitLine(hitPoint);

            //run animation hook rod
          }
        }
      }
    },
    hit: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "SpacePress") {
          Fishing.state = "Hit";
          console.log("hit");
          // var sun = Fishing.game.add.sprite(hitPoint.x, hitPoint.y, "sun");
          // sun.scale.setTo(0.1);
          var fish = Fishing.fishController.get("fish1", hitPoint);
          fish.loadAndPlay("hited");
        }
      }
    },
    miss: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "SpacePress") {
          //show "miss" message, come back like normal
          console.log("miss");
          
          var cloud = Fishing.game.add.sprite(hitPoint.x, hitPoint.y, "cloud1");
          cloud.scale.setTo(0.1);
        }
        Fishing.fishingHook.resume();
      }
    },
    mouseMove: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "Hit") {
          console.log("mouse move");
          //start twerk like neighbors from hell >> twerking
          //add fish mouch, some wave
            //console.log(wave);
            // Fishing.fishingLine.setHitLine(wave.position);

          // Fishing.fishingHook.resume();
          // Fishing.popup.show();
          Fishing.state = "MouseMove";
          $("canvas").trigger(Math.random() * 2 > 0 ? "success" : "fail", [hitPoint]);
          $("canvas").trigger("success", [hitPoint]);
        }
        // on twerking
      }
    },
    success: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "MouseMove") {
          console.log("success");
          console.log(hitPoint);
          Fishing.game.score += 100;
          Fishing.game.scoretext.setText('Score: ' + Fishing.game.score);
        }
        // start fish animation, fish come up from water
      }
    },
    fail: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "MouseMove") {
          console.log("fail");
          console.log(hitPoint);
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
