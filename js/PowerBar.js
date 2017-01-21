class PowerBar extends Phaser.Sprite {
  constructor(x, y, configs) {
    super(Fishing.game, x, y, "powerBar");
    Fishing.game.add.existing(this);
    // this.anchor.setTo(0.5, 0.5);
    this.mask = Fishing.game.add.graphics();
    this.mask.beginFill(0xffffff);
    this.mask.drawRect(0, 0, this.width, this.height);
    this.maskTween = Fishing.game.add.tween(this.mask);
    this.maskTween.to({x: -this.width}, 2000);
    this.maskTween.to({x: 0}, 2000);
    this.maskTween.loop(true);
    this.maskTween.start();
    this.maskTween.pause();
    this.powerBound = Fishing.game.add.sprite(x, y, "powerBound");

    Fishing.powerBarGroup.add(this);
    Fishing.powerBarGroup.add(this.mask);
    Fishing.powerBarGroup.add(this.powerBound);
    Fishing.powerBarGroup.position.set(Fishing.configs.GAME_WIDTH - this.width, Fishing.configs.GAME_HEIGHT - this.height);
  }
  update() {

  }

  reset() {
  }

  resume() {
    this.maskTween.resume();
  }

  pause() {
    this.maskTween.pause();
  }

}
