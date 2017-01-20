var Fishing = {};

Fishing.configs = {
  GAME_WIDTH: 1080,
  GAME_HEIGHT: 747,
  LAKE: {
    x: 0,
    y: 373
  }
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
    Fishing.game.load.image('background'      , 'Assets/lake.jpg');
    Fishing.game.load.image('waveBackground'  , 'Assets/waveBackground.png');
    Fishing.game.load.image('circle'          , 'Assets/circle.png');
    Fishing.game.load.image('boat'            , 'Assets/man&boat.png');
    Fishing.game.load.image('fish2', 'Assets/fish2.png', 166, 143);
    Fishing.game.load.spritesheet('fish1', 'Assets/fish1.png', 166, 143, 36);
    Fishing.game.load.image('rod'        ,   'Assets/rod.png');
    Fishing.game.load.image('hook'       ,   'Assets/hook.png');
    Fishing.game.load.image('fishingline',   'Assets/fishingline.png');
    Fishing.game.time.advancedTiming = true;
}

var create = function() {
  Fishing.game.physics.startSystem(Phaser.Physics.ARCADE);
  Fishing.keyboard = Fishing.game.input.keyboard;
  Fishing.background = Fishing.game.add.tileSprite(0, 0, Fishing.configs.GAME_WIDTH, Fishing.configs.GAME_HEIGHT, 'background');
  Fishing.waveBackground = [];
  // for(var i = 0; i < 20; i++) {
  //   Fishing.waveBackground.push(Fishing.game.add.tileSprite(0, 200 + i * 10, 1080, 88, 'waveBackground'));
  //   Fishing.waveBackground.tilePosition = Math.random() * 20 - 10;
  // }
  Fishing.wavesGroup = Fishing.game.add.group();

  Fishing.boat = Fishing.game.add.sprite(Fishing.configs.GAME_WIDTH / 2, Fishing.configs.GAME_HEIGHT / 2, 'boat');
  Fishing.boat.anchor.setTo(0.5, 0);
  Fishing.boat.scale.setTo(0.5);
  Fishing.boatTween = Fishing.game.add.tween(Fishing.boat);
  Fishing.boatTween.to({ y: Fishing.configs.GAME_HEIGHT / 2 + 10 }, 1500);
  Fishing.boatTween.to({ y: Fishing.configs.GAME_HEIGHT / 2 - 10 }, 3000);
  Fishing.boatTween.to({ y: Fishing.configs.GAME_HEIGHT / 2 }, 1500);
  Fishing.boatTween.loop(true);
  Fishing.boatTween.start();

  Fishing.waveController = new WaveController();
  Fishing.waveController.get("wave", {x: 200, y: 400});
  Fishing.cooldown = 10;
  Fishing.cooldownBoatWave = 1;

  fish = Fishing.game.add.sprite(200, 360, 'fish1', 36);
  anim = fish.animations.add('jump');
  fish.smoothed = true;

  anim.play(16, true);
  Fishing.fishingHook = new FishingHook(Fishing.configs.GAME_WIDTH/2, Fishing.configs.GAME_HEIGHT/2);
  Fishing.fishingLine = new FishingLine(Fishing.fishingHook.position);

// =======
//   new Wave(200, 300);
//   setTimeout(function() {
//     var x = new Wave(200, 400);
//     x.kill();
//   }, 100);
//   setTimeout(function() {
//     new Wave(400, 400);
//   }, 200);

  Fishing.fishingLineGroups = Fishing.game.add.physicsGroup();
  Fishing.fishingRodsGroups = Fishing.game.add.physicsGroup();

  Fishing.fishingRod = new FishingRod(
    {
      x : Fishing.configs.GAME_WIDTH/2,
      y: Fishing.configs.GAME_HEIGHT,
      img: 'rod'
    }
  );
}

var update = function() {
  Fishing.cooldown -= Fishing.game.time.physicsElapsed;
  if(Fishing.cooldown <= 0) {
    Fishing.waveController.get("wave", {x: 200, y: 400});
    Fishing.cooldown = 5 + Math.random() * 5;
  }

  Fishing.cooldownBoatWave -= Fishing.game.time.physicsElapsed;
  if(Fishing.cooldownBoatWave <= 0) {
    var boatWave = Fishing.waveController.get("wave", {x: Fishing.configs.GAME_WIDTH / 2,
       y: Fishing.configs.GAME_HEIGHT / 2 + 280});
    boatWave.scale.setTo(2.5);
    Fishing.cooldownBoatWave = 4 + Math.random() * 2;
  }
  Fishing.fishingLine.graphics.angle = Fishing.fishingHook.angle;
}
var render = function() {

}
