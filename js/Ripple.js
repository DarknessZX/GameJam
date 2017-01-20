class Ripple extends Phaser.Sprite {
  constructor(x, y, key, configs) {
    configs = configs || {};
    super(Fishing.game, x, y, key);
    Fishing.game.add.existing(this);
    // game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.rateScale = configs.rateScale || 0.3;
    this.rateAlpha = configs.rateAlpha || 1;
    this.size = configs.size || 0.5;
    this.maxSize = configs.maxSize || 1;
    this.speed = configs.speed || 0.01;
    console.log(">>>", this.alpha);
  }

  update() {
    // if(this.enable) {
      let x = (this.size += this.speed) >= this.maxSize ? (this.size = 0) : this.size;
      if(this.size == 0){
        console.log("reset");
        this.reset();
      }
      this.scale.setTo(x, x * this.rateScale);
      this.alpha -= this.speed * this.rateAlpha;
    // }
  }

  reset() {
    this.size = 0;
    this.alpha = 1;
  }

  reborn() {
    this.alive = this._exists = this.exists = true;
    this.alpha = 1;
  }
}
