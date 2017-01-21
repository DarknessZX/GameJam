class FishingLine {
  constructor(point1) {
    //super(point1.x, point1.y, point2.x, point2.y);
    //Fishing.game.add.existing(this);
    this.pointPosition = point1;
    this.graphics = Fishing.game.add.graphics(point1.x,point1.y);
    this.graphics.lineStyle(4, "0x000000", 1);
    this.graphics.moveTo(0,0);

    this.graphics.lineTo(0,300);
    this.countdown = 0;
    this.isClear = true;
    this.isHitWave = true;
  }

  create() {

  }

  update(fishingHook) {
    if (this.isHitWave)
      this.graphics.angle = fishingHook.angle;
  }

  setHitLine(hitwave) {
    if (this.isHitWave) {
      this.graphics.clear();
      this.isHitWave = false;
    }
    console.log(hitwave);
    var movePosition = {
      x: hitwave.x - this.graphics.x,
      y: hitwave.y - this.graphics.y
    };
    console.log(this.graphics);
    this.graphics.lineStyle(4, "0x000000", 1);
    this.graphics.angle = 0;
    this.graphics.moveTo(0,0);
    this.graphics.lineTo(hitwave.x - this.graphics.x,hitwave.y - this.graphics.y);
  }
}
