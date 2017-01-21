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
    Fishing.game.load.image('background'        , 'Assets/lake.jpg');
    Fishing.game.load.image('waveBackground'    , 'Assets/waveBackground.png');
    Fishing.game.load.image('circle'            , 'Assets/circle.png');
    Fishing.game.load.image('boat'              , 'Assets/man1.png');
    Fishing.game.load.spritesheet('fish1catched', 'Assets/fish1catched.png', 166, 143, 34);
    Fishing.game.load.spritesheet('rodAnimation', 'Assets/rod_animation.png', 375, 350, 15);
    Fishing.game.load.image('fish1idle'         , 'Assets/fish1idle.png');
    Fishing.game.load.image('rod'               , 'Assets/rod.png');
    Fishing.game.load.image('hook'              , 'Assets/hook.png');
    Fishing.game.load.image('powerBar'          , 'Assets/FilledBar.png');
    Fishing.game.load.image('powerBound'        , 'Assets/EmptyBar.png');
    Fishing.game.load.image('cloud1'            , 'Assets/cloud1.png');
    Fishing.game.load.image('cloud2'            , 'Assets/cloud2.png');
    Fishing.game.load.image('sun'               , 'Assets/sun.png');
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
  Fishing.fishsGroup = Fishing.game.add.group();
  Fishing.powerBarGroup = Fishing.game.add.group();
  Fishing.popupGroup = Fishing.game.add.group();
  //rod
  Fishing.fishingHook = new FishingHook(Fishing.configs.GAME_WIDTH / 2, Fishing.configs.GAME_HEIGHT / 2.5);
  //Fishing.fishingLine = new FishingLine(Fishing.fishingHook.position);


  Fishing.fishingLineGroups = Fishing.game.add.physicsGroup();
  Fishing.fishingRodsGroups = Fishing.game.add.physicsGroup();
  Fishing.fishingHooksGroups = Fishing.game.add.physicsGroup();

  Fishing.fishingRod = new FishingRod(
    {
      x : Fishing.configs.GAME_WIDTH/2,
      y: Fishing.configs.GAME_HEIGHT/2.5,
      img: 'rod'
    }
  );

  Fishing.fishingLine = new FishingLine(new Phaser.Point(Fishing.fishingRod.sprite.position.x,Fishing.fishingRod.sprite.position.y));

  // Fishing.fishingRod.sprite.scale.setTo(-0.5, 0.5);

  //boat and man
  Fishing.boat = Fishing.game.add.sprite(Fishing.configs.GAME_WIDTH - 200, Fishing.configs.GAME_HEIGHT * 0.8 + 40, 'boat');
  Fishing.boat.anchor.setTo(0.5, 0.5);
  //boar and man move up and down
  Fishing.boatTween = Fishing.game.add.tween(Fishing.boat);
  Fishing.boatTween.to({ y: Fishing.configs.GAME_HEIGHT * 0.8 + 50 }, 1500);
  Fishing.boatTween.to({ y: Fishing.configs.GAME_HEIGHT * 0.8 + 30 }, 3000);
  Fishing.boatTween.to({ y: Fishing.configs.GAME_HEIGHT * 0.8 + 40 }, 1500);
  Fishing.boatTween.loop(true);
  Fishing.boatTween.start();

  //create wave controller
  Fishing.waveController = new WaveController();
  Fishing.fishController = new FishController();
  var wave = Fishing.waveController.get("wave", {x: 200, y: 400});
  $("canvas").trigger("success", [wave]);
  //fish wave will be summoned every Fishing.cooldown seconds
  Fishing.cooldown = 10;
  //boat wave will be summoned every Fishing.cooldownBoatWave seconds
  Fishing.cooldownBoatWave = 1;

  //power bar
  Fishing.powerBar = new PowerBar(0, 0);

  $(document).trigger("creating");

  var textScore = Fishing.game.add.group();
  Fishing.game.score = 0;
  textScore.add(Fishing.game.make.text(100,50,"Score:",{ font: "32px Arial", fill: "#000000" }));
  //console.log(Fishing.game.scoretext);
  //<test>

  // fish = Fishing.game.add.sprite(200, 360, 'fish1', 36);
  // anim = fish.animations.add('jump');
  // fish.smoothed = true;
  //
  // anim.play(16, true);

  //</test>

}

var update = function() {
  // summon fish wave
  Fishing.cooldown -= Fishing.game.time.physicsElapsed;
  if(Fishing.cooldown <= 0) {
    var wave = Fishing.waveController.get("wave", {x: 150 + Math.random() * (Fishing.configs.GAME_WIDTH - 300), y: Fishing.configs.LAKE.y + 45 + Math.random(Fishing.configs.GAME_HEIGHT - Fishing.configs.LAKE.y - 90)});
    Fishing.cooldown = 10 + Math.random() * 5;
  }

  //summon boatWave
  Fishing.cooldownBoatWave -= Fishing.game.time.physicsElapsed;
  if(Fishing.cooldownBoatWave <= 0) {
    var boatWave = Fishing.waveController.get("wave", {x: Fishing.configs.GAME_WIDTH -200,
       y: Fishing.configs.GAME_HEIGHT / 2 + 280});
    boatWave.scale.setTo(2.5);
    boatWave.isBoatWave = true;
    Fishing.cooldownBoatWave = 4 + Math.random() * 2;
  }
  Fishing.currentHookPoint = new Phaser.Point(Fishing.configs.GAME_WIDTH/2,Fishing.configs.GAME_HEIGHT/2+300)

  Fishing.fishingLine.update(Fishing.fishingHook);
  Fishing.fishingHook.update();
}

var render = function() {

}
