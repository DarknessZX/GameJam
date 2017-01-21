
$(document).on("creating", function() {
  Fishing.game.eventHandler = {
    click: function(e) {
      if(!Fishing.game.paused && !Fishing.state) {
        //stop tween hook rotation
        Fishing.powerBar.resume();
        Fishing.fishingHook.pause();
        Fishing.state = "Click";
        Fishing.clickable = false;
      }
    },
    keyPress: function(e) { //power, origin, angle
      if(!Fishing.game.paused) {
         // Spacebar
        if(Fishing.state == "Click") {
          if(Fishing.clickable){
             Fishing.powerBar.pause();
             Fishing.fishingLine.clear();
             Fishing.fishingRod.loadAndPlay("hookRod", 15, false);
             Fishing.game.sound.play("swingrod");
            // Fishing.fishingLine.setHitLine(hitPoint);
            //run animation hook rod
          }
          Fishing.clickable = true;
        }
      }
    },
    hit: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "SpacePress") {
          Fishing.state = "Hit";
          // console.log("hit");
          // var sun = Fishing.game.add.sprite(hitPoint.x, hitPoint.y, "sun");
          // sun.scale.setTo(0.1);
          var fish = Fishing.fishController.get("fish1", hitPoint);
          Fishing.game.sound.play("yeah");
          fish.loadAndPlay("hited");
          Fishing.fishingRod.fish = fish;
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
          // console.log("miss");
          Fishing.state = null;
          var missText = new Message(hitPoint.x, hitPoint.y, "Miss");
          if(Math.random() * 2 < 0)
            Fishing.fireAngle.show();
          setTimeout(function() {
            missText.kill();
          }, 500);
        }
      }
    },
    mouseMove: function(e, hitPoint, fish) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "Hit") {
          var pointer = Fishing.game.input.activePointer.position;
          Fishing.hookTwerk.position.x += pointer.x > Fishing.hookTwerk.position.x ? 3 : -3;
          Fishing.hookTwerk.position.y += pointer.y > Fishing.hookTwerk.position.y ? 3 : -3;

          //start twerk like neighbors from hell >> twerking
          //add fish mouch, some wave
            //console.log(wave);
            // Fishing.fishingLine.setHitLine(wave.position);

          // Fishing.fishingHook.resume();
          // Fishing.popup.show();
        }
      }
    },
    mouseEnd: function(e, hitPoint, success, fish) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "Hit") {
          Fishing.hookBound.hide();
          Fishing.hookTwerk.hide();
          Fishing.state = "MouseMove";
          if(!success) {
            Fishing.fishingHook.resume();
            $("canvas").trigger("fail", [hitPoint, fish]);
          } else {
            $("canvas").trigger("success", [hitPoint, fish]);
          }
        }
        // on twerking
      }
    },
    success: function(e, hitPoint, fish) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "MouseMove") {
          Fishing.state = "Success";
          // console.log("success");
          // console.log(hitPoint);
          Fishing.game.sound.play("winning");
          Fishing.game.score += 100;
          Fishing.game.scoretext.setText('Score: ' + Fishing.game.score);
          fish.loadAndPlay("catched", 13, false);
          var successText = new Message(hitPoint.x, hitPoint.y, "Success");
          setTimeout(function() {
            successText.kill();
          }, 500);
        }
        // start fish animation, fish come up from water
      }
    },
    fail: function(e, hitPoint, fish) {
      if(fish) {
        Fishing.fishController.kill(fish);
      }
      if(!Fishing.game.paused) {
        if(Fishing.state == "MouseMove") {
          var failText = new Message(hitPoint.x, hitPoint.y, "Fail");
          Fishing.state = null;
          if(Math.random() * 3 < 0)
            Fishing.fireAngle.show();
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
  $("canvas").on("click",   Fishing.game.eventHandler.keyPress); //including press space
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
