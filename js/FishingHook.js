class FishingHook extends Phaser.Sprite{
  constructor(x,y, configs) {
    super(Fishing.game, x, y, 'hook');
    configs = configs || {};
    Fishing.game.add.existing(this);
    this.anchor.setTo(0.5,-4);
    this.movingRight = true;
    //this.addChild(this.hook2 = Fishing.game.add.sprite(0,3 * this.height,'hook'));
    Fishing.hookTween = Fishing.game.add.tween(this);
    Fishing.hookTween.to({ angle: 60 }, 1500, Phaser.Easing.Circular.Out);
    Fishing.hookTween.to({ angle: 0 }, 3000, Phaser.Easing.Circular.In);
    Fishing.hookTween.to({ angle: -60 }, 1500, Phaser.Easing.Circular.Out);
    Fishing.hookTween.to({ angle: 0 }, 3000, Phaser.Easing.Circular.In);
    Fishing.hookTween.loop(true);

    Fishing.hookTween.start();
  }
  update() {
    // if (this.movingRight)
    //   this.angle++;
    // else
    //   this.angle--;
    //
    // if (this.angle >= 60)
    //   this.movingRight = false;
    // else if (this.angle <= -60)
    //   this.movingRight = true;
    //console.log('hook2:' + this.hook2.position);
  }
}
