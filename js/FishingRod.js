class FishingRod {
  constructor(info, configs) {
    //console.log(info);
    this.sprite = Fishing.fishingRodsGroups.create(
      info.x,
      info.y,
      info.img
    );
    console.log(this.sprite);
    this.configs = configs;
    this.sprite.anchor.set(0.9, 0.9);
  }

  update() {
  }
}
