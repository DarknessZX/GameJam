
class HookTwerk extends Phaser.Sprite {
  constructor(x, y, configs) {
    configs = configs || {};
    super(Fishing.game, x, y, 'hook');
    Fishing.game.add.existing(this);
    this.alpha = 0;
    this.timeOut = 3;
  }

  update() {
    if(this.alpha > 0 && this.alive) {
      this.timeOut -= Fishing.game.time.physicsElapsed;
      if(this.position.distance(Fishing.hookBound.position) > 60) {
        $(document).trigger("mouseend", [Fishing.hookBound.position, false, Fishing.fishingRod.fish]);
        return;
      }
      if(this.timeOut <= 0) {
        $(document).trigger("mouseend", [Fishing.hookBound.position, true, Fishing.fishingRod.fish]);
        return;
      }
      this.position.x += Math.random() * 2;
      this.position.y += Math.random() * 2;
    }
  }

  show(configs) {
    configs = configs || {};
    this.position.set(configs.x || 0, configs.y || 0);
    this.alpha = 1;
    this.timeOut = 3;
  }
  hide(){
    this.alpha = 0;
  }
}
