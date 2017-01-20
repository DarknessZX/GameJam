var Nakama = {};

Nakama.configs = {
  GAME_WIDTH: 640,
  GAME_HEIGHT: 940
};

window.onload = function() {
  Nakama.game = new Phaser.Game(
    Nakama.configs.GAME_WIDTH,
    Nakama.configs.GAME_HEIGHT,
    Phaser.AUTO,
    '',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    },
    false,
    false
  );
}


var preload = function() {
    Nakama.game.scale.minWidth = 320;
    Nakama.game.scale.minHeight = 480;
    Nakama.game.scale.maxWidth = 640;
    Nakama.game.scale.maxHeight = 960;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.time.advancedTiming = true;
}

var create = function() {
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
  Nakama.background = Nakama.game.add.tileSprite(0, 0, Nakama.configs.GAME_WIDTH, Nakama.configs.GAME_HEIGHT, 'background');

  Nakama.bulletsGroup = Nakama.game.add.physicsGroup();
  Nakama.enemiesGroup = Nakama.game.add.physicsGroup();
  Nakama.shipControllersGroup = Nakama.game.add.physicsGroup();
}

var update = function() {

}
var render = function() {
  
}
