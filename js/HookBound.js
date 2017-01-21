class HookBound extends Phaser.Sprite {
  constructor(x, y, configs) {
    configs = configs || {};
    super(x, y, "hookBound");
    this.alpha = 0;
  }

  update() {

  }

  show(configs) {
    this.position.set(configs.x || 0, configs.y || 0);
    this.alpha = 1;
  }

  hide(){
    this.alpha = 0;
  }
}
