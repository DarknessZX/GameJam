
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
        if(Fishing.state == "Click") {
          if(e.keyCode == 32){
             Fishing.powerBar.pause();
             Fishing.fishingLine.clear();
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
          Fishing.fishingRod.loadAndPlay("idle");
          Fishing.hookTwerk.show(hitPoint);
          Fishing.hookBound.show(hitPoint);
        }
      }
    },
    miss: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "SpacePress") {
          //show "miss" message, come back like normal
          console.log("miss");
          var missText = new Message(hitPoint.x, hitPoint.y, "Miss");
          setTimeout(function() {
            missText.kill();
          }, 500);
        }
      }
    },
    mouseMove: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "Hit") {

          //start twerk like neighbors from hell >> twerking
          //add fish mouch, some wave
            //console.log(wave);
            // Fishing.fishingLine.setHitLine(wave.position);

          // Fishing.fishingHook.resume();
          // Fishing.popup.show();
        }
      }
    },
    mouseEnd: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "Hit") {
          Fishing.hookBound.hide();
          Fishing.hookTwerk.hide();
          Fishing.state = "MouseMove";
          if(Fishing.hookBound.position.distance(Fishing.hookTwerk.position) > 5) {
            $("canvas").trigger("fail", [hitPoint]);
          } else {
            $("canvas").trigger("success", [hitPoint]);
          }
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
          var successText = new Message(hitPoint.x, hitPoint.y, "Success");
          setTimeout(function() {
            successText.kill();
          }, 500);
        }
        // start fish animation, fish come up from water
      }
    },
    fail: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "MouseMove") {
          var failText = new Message(hitPoint.x, hitPoint.y, "Fail");
          setTimeout(function() {
            failText.kill();
          }, 500);
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
  $(document).on("mouseend",   Fishing.game.eventHandler.mouseEnd);
  $("canvas").on("success",    Fishing.game.eventHandler.success);
  $("canvas").on("fail",       Fishing.game.eventHandler.fail);

  Fishing.wavesGroup.children.forEach(function(child) {
    $("canvas").trigger("success", [child]);
  })
})
