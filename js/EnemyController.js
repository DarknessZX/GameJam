class EnemyController{
  contructor(info, config) {
    var enemy = Nakama.enemiesGroup.create(
      info.x, info.y, 'assets', info.img
    );
    enemy.health = 10;
  }
}
