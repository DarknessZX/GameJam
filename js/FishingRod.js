class FishingRod {
  constructor(info, configs) {
    //console.log(info);
    this.sprite = Fishing.fishingRodsGroups.create(
      info.x,
      info.y,
      info.img
    );
    this.configs = configs;
    this.sprite.animations.add("idle");
    this.sprite.anchor.set(0.05, 0.04);
    this.sprite.animations.map = {
      idle        : {
        img : info.img,
        anchor: {x : 0.05, y : 0.04},
        scale: 1
      },
      hookRod     : {
        img : "rodAnimation",
        anchor: {x : 0.07, y : 0.385},
        scale: 2
      }
    };

    this.sprite.loadTexture("rodAnimation");
    var anim = this.sprite.animations.add("hookRod");
    anim.onComplete.add(this.onCompleteHookRod.bind(this), Fishing.game);
    // this.sprite.animations.play("hookRod", 10, true);
    this.loadAndPlay("idle");
  }

  update() {
  }

  loadAndPlay(name) {
    let config = this.sprite.animations.map[name];
    this.sprite.loadTexture(config.img);
    this.sprite.anchor.setTo(config.anchor.x, config.anchor.y);
    this.sprite.scale.setTo(config.scale);
    this.sprite.animations.play(name, 10, false);
  }

  onCompleteHookRod() {
    var origin = {
      x: Fishing.configs.GAME_WIDTH / 2,
      y: Fishing.boat.position.y
    };
    var power = (Fishing.powerBar.mask.position.x + Fishing.powerBar.width) * 2;
    var angle = Fishing.fishingHook.rotation;
    Fishing.state = "SpacePress";
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
      this.loadAndPlay("idle");
    }
  }
}
