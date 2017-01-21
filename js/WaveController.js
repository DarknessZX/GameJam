class WaveController extends Controller{
  constructor() {
    super(["wave"], [Wave], Fishing.wavesGroup);
  }

  kill(wave) {
    wave.position.setTo(0, 0);
    wave.kill();
        // console.log(this.deads[enemy.name].length + " | " + Fishing.enemyGroup.children.length);
    this.deads[wave.name].push(wave);
    // Fishing.enemyController.get(0);
  }
}
