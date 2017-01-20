var Fishing = {};

Fishing.configs = {
  GAME_WIDTH: 1080,
  GAME_HEIGHT: 747
};

window.onload = function() {
  Fishing.game = new Phaser.Game(
    Fishing.configs.GAME_WIDTH,
    Fishing.configs.GAME_HEIGHT,
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
    Fishing.game.scale.minWidth = 720;
    Fishing.game.scale.minHeight = 498;
    Fishing.game.scale.maxWidth = 1080;
    Fishing.game.scale.maxHeight = 747;
    Fishing.game.scale.pageAlignHorizontally = true;
    Fishing.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Fishing.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Fishing.game.load.image('background' ,   'Assets/lake.jpg');
    Fishing.game.load.image('circle'     ,   'Assets/circle.png');
    Fishing.game.time.advancedTiming = true;
}

var create = function() {
  Fishing.game.physics.startSystem(Phaser.Physics.ARCADE);
  Fishing.keyboard = Fishing.game.input.keyboard;
  Fishing.background = Fishing.game.add.tileSprite(0, 0, Fishing.configs.GAME_WIDTH, Fishing.configs.GAME_HEIGHT, 'background');
  Fishing.wavesGroup = Fishing.game.add.group();

  new Wave(200, 300);
  setTimeout(function() {
    var x = new Wave(200, 400);
    x.kill();
  }, 100);
  setTimeout(function() {
    new Wave(400, 400);
  }, 200);
}

var update = function() {

}
var render = function() {

}
