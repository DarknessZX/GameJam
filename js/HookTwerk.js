
class HookTwerk extends Phaser.Sprite {
  constructor(x, y, configs) {
    configs = configs || {};
    super(Fishing.game, x, y, 'hookBound');
    Fishing.game.add.existing(this);
    this.timeOut = 3;
  }

  update() {
    if(this.alpha > 0 && this.alive) {
      this.timeOut -= Fishing.game.time.physicsElapsed;
      if(this.timeOut <= 0) {
        this.hide();
      }
      this.position.x += Math.random() * 5;
      this.position.y += Math.random() * 5;
    }
  }

  show(configs) {
    configs = configs || {};
    this.position.set(configs.x || 0, configs.y || 0);
    this.alpha = 1;
  }
  hide(){
    this.alpha = 0;
  }
}
