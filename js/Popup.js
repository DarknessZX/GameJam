class Popup extends Phaser.Sprite {
  constructor(configs) {
    super(0, 0, "popup");
    Fishing.game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);
    popupGroup.add(this);

    this.hook = Fishing.game.add.sprite(0, 0, 'hook');
    this.hook.anchor.setTo(0.5, 0.5);
    this.hook.scale.setTo(2);
    Fishing.popupGroup.add(this.hook);

    this.hookBound = Fishing.game.add.sprite(0, 0, 'hookBound');
    this.hookBound.anchor.setTo(0.5, 0.5);
    this.hook.scale.setTo(2);
    Fishing.popupGroup.add(this.hookBound);
  }
  update() {
    if(this.alive) {
      if(Fishing.popupGroup.alpha > 0) {
        
      }
    }
  }

  show(location) {

  }

  reset() {

  }

  hide() {
    Fishing.popupGroup.alpha = 0;
  }
}
