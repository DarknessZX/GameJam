class Fish1 extends Phaser.Sprite{
  constructor(x, y, configs) {
    configs = configs || {};
    super(Fishing.game, x, y, "fish1idle");
    if(configs.x && configs.y) {
      this.position.setTo(configs.x, configs.y);
    }
    this.anchor.setTo(0.5);
    Fishing.game.add.existing(this);
    Fishing.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.animations.map = {
      idle        : "fish1idle",
      catched     : "fish1catched"
    };
    Object.keys(this.animations.map).forEach(function(key) {
      this.loadTexture(this.animations.map[key]);
      this.animations.add(key);
    }.bind(this));
    this.loadAndPlay("idle", 1, false, function() {
      this.loadAndPlay("catched", 20, true);
    }.bind(this));
  }

  update() {
  }

  reset(x, y) {
    this.position.setTo(x, y);
  }

  loadAndPlay(name, rate, loop) {
    this.loadTexture(this.animations.map[name]);
    this.animations.play(name, rate, loop);
  }

  reborn(configs) {
    this.alive = this._exists = this.exists = true;
    this.scale.set(1, 1);
    if(configs.x && configs.y) {
      this.position.setTo(configs.x, configs.y);
    }
  }
}
