
class HookBound extends Phaser.Sprite {
  constructor(x, y, configs) {
    configs = configs || {};
    super(Fishing.game, x, y, 'hookBound');
    Fishing.game.add.existing(this);
    this.alpha = 0;
  }

  update() {
  }


  show(configs) {
    configs = configs || {};
    console.log(this);
    this.position.set(configs.x || 0, configs.y || 0);
    this.alpha = 1;
    console.log(this);
  }
  hide(){
    this.alpha = 0;
  }
}
