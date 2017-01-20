class ShipController{
  constructor(info, configs) {
    this.sprite = Nakama.shipControllersGroup.create(
      info.x || 0,
      info.y || 0,
      'assets',
      info.img || 'Spaceship1-Player.png'
    );
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.configs = configs;
    this.timeSinceLastFire = 0;
  }

  update() {
    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    if(Nakama.keyboard.isDown(this.configs.control.up)) {
      this.sprite.body.velocity.y =- this.configs.shipSpeed;
    } else if(Nakama.keyboard.isDown(this.configs.control.down)) {
      this.sprite.body.velocity.y = this.configs.shipSpeed;
    } else {
      this.sprite.body.velocity.y = 0;
    }

    if(Nakama.keyboard.isDown(this.configs.control.right)) {
      this.sprite.frameName = this.configs.frameName.right;
      this.sprite.body.velocity.x = this.configs.shipSpeed;
    } else if(Nakama.keyboard.isDown(this.configs.control.left)) {
      this.sprite.frameName = this.configs.frameName.left;
      this.sprite.body.velocity.x =- this.configs.shipSpeed;
    }
    else {
      this.sprite.frameName = this.configs.frameName.front;
      this.sprite.body.velocity.x = 0;
    }

    this.sprite.x = (this.sprite.x < 0 ? 0 : this.sprite.x > Nakama.configs.GAME_WIDTH ? Nakama.configs.GAME_WIDTH : this.sprite.x);
    this.sprite.y = (this.sprite.y < 0 ? 0 : this.sprite.y > Nakama.configs.GAME_HEIGHT ? Nakama.configs.GAME_HEIGHT : this.sprite.y);

    //----------------fire--------------------
    if(Nakama.keyboard.isDown(this.configs.control.fire) && this.timeSinceLastFire >= this.configs.cooldown) {
      this.fire();
      this.timeSinceLastFire = 0;
    }
  }

  fire() {

    var bullet = Nakama.bulletsGroup.create(
      this.sprite.position.x,
      this.sprite.position.y,
      'assets',
      "BulletType1.png"
    );
    bullet.anchor = new Phaser.Point(0.5, 0.5);
    // Nakama.game.physics.enable(bullet, Phaser.Physics.ARCADE);

    bullet.body.velocity = new Phaser.Point(1, -10).setMagnitude(this.configs.bulletSpeed);

    var bullet2 = Nakama.bulletsGroup.create(
      this.sprite.position.x,
      this.sprite.position.y,
      'assets',
      "BulletType1.png"
    );
    bullet2.anchor = new Phaser.Point(0.5, 0.5);

    bullet2.body.velocity = new Phaser.Point(0, -10).setMagnitude(this.configs.bulletSpeed);

    var bullet2 = Nakama.bulletsGroup.create(
      this.sprite.position.x,
      this.sprite.position.y,
      'assets',
      "BulletType1.png"
    );
    bullet2.anchor = new Phaser.Point(0.5, 0.5);

    bullet2.body.velocity = new Phaser.Point(0, -10).setMagnitude(this.configs.bulletSpeed);
  }
}
