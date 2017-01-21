class FishingRod {
  constructor(info, configs) {
    //console.log(info);
    this.sprite = Fishing.fishingRodsGroups.create(
      info.x,
      info.y,
      info.img
    );
    this.configs = configs;
    this.sprite.anchor.set(0.05, 0.04);

    this.sprite.loadTexture("rodAnimation");
    this.sprite.anchor.setTo(0.07, 0.385);
    this.sprite.scale.setTo(2);
    this.sprite.animations.add("hookRod");
    // this.sprite.animations.play("hookRod", 10, true);
  }

  update() {
  }
}
