class Wave extends Phaser.Sprite{
  constructor(x, y, configs) {
    configs = configs || {};
    super(Fishing.game, x, y);
    this.name = "wave";
    if(configs.x && configs.y) {
      this.position.setTo(configs.x, configs.y);
    }
    this.timeOut = configs.timeOut || 3;
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

  reset(x, y) {
    this.position.setTo(x, y);
    this.ripples.forEach(function(ripple) {
      ripple.reset();
    });
  }

  reborn(configs) {
    this.alive = this._exists = this.exists = true;
    this.ripples.forEach(function(ripple) {
      ripple.reborn();
    })
    this.scale.set(1, 1);
    this.timeOut = configs.timeOut || 3;

    if(configs.x && configs.y) {
      this.position.setTo(configs.x, configs.y);
    }
  }
}
