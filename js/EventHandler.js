
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
        if(Fishing.state == "Click") {
          if(e.keyCode == 32){
            var origin = {
              x: Fishing.configs.GAME_WIDTH/2,
              y: Fishing.boat.position.y
            };
            var power = (Fishing.powerBar.mask.position.x + Fishing.powerBar.width) * 2;
            var angle = Fishing.fishingHook.rotation;
            // var maxPower = 300;
            // angle = 0;
            // console.log(power = (origin.y - Fishing.configs.GAME_HEIGHT / 2 - 50) / 0.3);
            // console.log(origin, power, angle);
            Fishing.state = "SpacePress";
            //calcul
            // console.log({x: origin.x + power * Math.sin(angle), y: origin.y + power * Math.cos(angle)});
            // var fish = Fishing.fishController.get("fish1", new Phaser.Point(origin.x - power * Math.sin(angle), origin.y - power * Math.cos(angle)));
            // fish.loadAndPlay("catched", 20, true);
            var hitPoint = new Phaser.Point(origin.x - power * Math.sin(angle), origin.y - (power * Math.cos(angle)) * 0.3);
            var hit = false;
            Fishing.wavesGroup.children.forEach(function(wave) {
              if(wave.alive && !wave.isBoatWave) {
                if(wave.checkHit(hitPoint)) {
                  $("canvas").trigger("hit", [hitPoint]);
                  hit = true;
                }
              }
            })
            if(!hit) {
              $("canvas").trigger("miss", [hitPoint]);
            }
            // Fishing.fishingLine.setHitLine(hitPoint);

            //run animation hook rod
          }
        }
      }
    },
    hit: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "SpacePress") {
          Fishing.state = "hit";
          console.log("hit");
          var sun = Fishing.game.add.sprite(hitPoint.x, hitPoint.y, "sun");
          sun.scale.setTo(0.1);
          $("canvas").trigger("mouseMove", [hitPoint]);
        }
        //start twerk like neighbors from hell >> twerking
          //console.log(wave);
          // Fishing.fishingLine.setHitLine(wave.position);
        Fishing.fishingHook.resume();
        Fishing.popup.show();
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
          //twerk
          Fishing.state = "MouseMove";
          $("canvas").trigger(Math.random() * 2 > 0 ? "success" : "fail", [hitPoint]);
        }
        // on twerking
      }
    },
    success: function(e, hitPoint) {
      if(!Fishing.game.paused) {
        if(Fishing.state == "MouseMove") {
          console.log("success");
          console.log(hitPoint);
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
