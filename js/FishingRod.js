class FishingRod {
  constructor(info, configs) {
    //console.log(info);
    this.sprite = Fishing.fishingRodsGroups.create(
      info.x,
      info.y,
      info.img
    );
    this.configs = configs;
    this.sprite.anchor.set(0.1, 0.1);
  }

  update() {
  }
}
