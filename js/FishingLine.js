class FishingLine {
  constructor(point1) {
    //super(point1.x, point1.y, point2.x, point2.y);
    //Fishing.game.add.existing(this);
    this.graphics = Fishing.game.add.graphics(point1.x,point1.y/2);

    // this.graphics.anchor.set(point1.x,point1.y);
    //this.graphics.position.set(point1.x,point1.y);
    this.graphics.lineStyle(1, "0x000000", 1);
    this.graphics.moveTo(0,0);

    this.graphics.lineTo(0,300);

    console.log(this.graphics);
    this.countdown = 0;
    this.isClear = true;
  }

  create() {

  }

  update(point1) {
  }
}
