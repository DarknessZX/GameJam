class FishingHook extends Phaser.Sprite{
  constructor(x,y, configs) {
    super(Fishing.game, x, y, 'hook');
    configs = configs || {};
    Fishing.game.add.existing(this);
    this.anchor.setTo(0.5,-2);
    this.movingRight = true;
    this.angle = 60;
    //this.addChild(this.hook2 = Fishing.game.add.sprite(0,3 * this.height,'hook'));
    Fishing.hookTween = Fishing.game.add.tween(this);
    Fishing.hookTween.to({ angle: -60 }, 3000, Phaser.Easing.Cubic.InOut);
    Fishing.hookTween.to({ angle: 60 }, 3000, Phaser.Easing.Cubic.InOut);
    Fishing.hookTween.loop(true);

    Fishing.hookTween.start();
  }
  update() {
    // var hit = true;
    // if (hit) {
    //   Fishing.hookTween.stop();
    // }
  }

  pause() {
    Fishing.hookTween.pause();
  }

  resume() {
    Fishing.hookTween.resume();
  }
}
