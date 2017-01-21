class FireAngle2 extends Phaser.Graphics {
  constructor(x, y) {
    super(Fishing.game, x, y);
    Fishing.game.add.existing(this);
    this.addChild(Fishing.game.add.text(-400, -500, "THROW AREA", { font: "128px Arial", fill: "#000000" }));
  }

  init() {
    this.alpha = 0;
    this.beginFill("0xff0000");
    this.drawCircle(0, 0, 1500);
    this.scale.setTo(1, 0.3);
    this.position.set(Fishing.configs.GAME_WIDTH / 2, Fishing.boat.position.y);
    this.mask = Fishing.game.add.graphics();
    this.addChild(this.mask);
    this.mask.beginFill("0x000000");
    this.mask.moveTo(0, 0);
    this.mask.lineTo(-1450, -1000);
    this.mask.lineTo(1450, -1000);
    this.tween = Fishing.game.add.tween(this);
    this.tween.to({alpha: 0}, 3000);
    return this;
  }

  update() {
  }

  show() {
    console.log(">>");
    this.alpha = 0.4;
    this.tween.start();
  }
}
