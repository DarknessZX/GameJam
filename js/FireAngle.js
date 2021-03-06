class FireAngle extends Phaser.Graphics {
  constructor(x, y) {
    super(Fishing.game, x, y);
    Fishing.game.add.existing(this);
    this.addChild(Fishing.game.add.text(-100, 80, "THROW ANGLE", { font: "26px Arial", fill: "#000000" }));
  }

  init() {
    this.alpha = 0;
    this.beginFill("0xff0000");
    this.drawCircle(0, 0, 300);
    this.position.set(Fishing.fishingRod.sprite.x, Fishing.fishingRod.sprite.y);
    this.mask = Fishing.game.add.graphics();
    this.addChild(this.mask);
    this.mask.beginFill("0x000000");
    this.mask.moveTo(0, 0);
    this.mask.lineTo(-330, 200);
    this.mask.lineTo(330, 200);
    this.tween = Fishing.game.add.tween(this);
    this.tween.to({alpha: 0}, 3000);
    this.tween.onComplete.add(function() {
      Fishing.fireAngle2.show();
    })
    return this;
  }

  update() {
  }

  show() {
    this.alpha = 0.4;
    this.tween.start();
  }
}
