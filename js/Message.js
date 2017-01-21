class Message extends Phaser.Text {
  constructor(x, y, message) {
    super(Fishing.game, x, y, message, { font: "32px Arial", fill: "#000000" });
    Fishing.game.textScoreGroup.add(this);
  }

  update() {

  }

  setConfigs(configs) {
    this.x = configs.x;
    this.y = configs.y;
    this.setText(configs.message);
  }
}
