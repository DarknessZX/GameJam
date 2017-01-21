class HookTwerk extends Phaser.Sprite {
  constructor(x, y, configs) {
    configs = configs || {};
    super(x, y, 'hook');
    this.timeOut = 3;
  }

  update() {
    if(this.alpha > 0) {
      this.timeOut -= Fishing.game.time.physicsElapsed;
      if(this.timeOut <= 0) {
        
      }
      this.x += Math.Random() * 5;
      this.y += Math.Random() * 5;
    }
  }

  show(configs) {
    this.position.set(configs.x || 0, configs.y || 0);
    this.alpha = 1;
  }

  hide(){
    this.alpha = 0;
  }
}
