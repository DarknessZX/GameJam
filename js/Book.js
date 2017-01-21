class Book extends Phaser.Sprite {
  constructor(x, y) {
    super(Fishing.game, x, y);

    this.animations.map = {
      idle        : "book"
    };
    Object.keys(this.animations.map).forEach(function(key) {
      this.loadTexture(this.animations.map[key]);
      this.animations.add(key);
    }.bind(this));
    this.loadAndPlay("idle", 4, false);
    this.scale.setTo(2);
    this.countdown = 5;
  }

  update() {
    if (this.alive) {
      this.countdown -= Fishing.game.time.physicsElapsed;
      if (this.countdown <= 0) {
        this.loadAndPlay("idle", 4 ,false);
        this.countdown = 10;
      }
    }
  }

  loadAndPlay(name, rate, loop) {
    this.loadTexture(this.animations.map[name]);
    this.animations.play(name, rate, loop);
  }
}
