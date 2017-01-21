class Wave extends Phaser.Sprite{
  constructor(x, y, configs) {
    configs = configs || {};
    super(Fishing.game, x, y);
    this.name = "wave";
    if(configs.x && configs.y) {
      this.position.setTo(configs.x, configs.y);
    }
    this.timeOut = configs.timeOut || 10;
    Fishing.game.add.existing(this);
    Fishing.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.ripples = [];
    for(var i = 0; i < (configs.ripples || 5); i++) {
      var ripple = new Ripple(0, 0, 'circle', {
        rateScale : 0.3,
        size: 1 / (configs.ripples || 5) * i,
        speed     : 0.01
      });
      this.addChild(ripple);
      this.ripples.push(ripple);
    }
  }

  update() {
    if(this.alive) {
      this.timeOut -= Fishing.game.time.physicsElapsed;
      if(this.timeOut <= 0) {
        Fishing.waveController.kill(this);
      }
      this.ripples.forEach(function(ripple) {
        ripple.update();
      })
    }
  }

  reset(configs) {
    configs = configs || {};
    this.position.setTo(configs.x, configs.y);
    this.scale.set(1, 1);
    this.timeOut = configs.timeOut || 10;
    this.isBoatWave = undefined;

    if(configs.x && configs.y) {
      this.position.setTo(configs.x, configs.y);
    }
  }

  reborn(configs) {
    this.alive = this._exists = this.exists = true;
    this.ripples.forEach(function(ripple, i) {
      ripple.reborn({
        size: 1 / (i + 1),
        alpha: 1 - i * 0.2
      });
    })
    this.reset(configs);
  }

  checkHit(point) {
    point = point || {};
    if(this.x - 120 < point.x && this.x + 120 > point.x
        && this.y - 30 < point.y && this.y + 30 > point.y)
        return true;
    return false;
  }
}
