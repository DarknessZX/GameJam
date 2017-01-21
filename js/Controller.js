class Controller{
  constructor(names, construcs, group) {
    this.deads = {};
    this.construcs = {};
    names.forEach(function(name) {
      this.deads[name] = [];
    }.bind(this));
    construcs.forEach(function(construc, i) {
      this.construcs[names[i]] = construc;
    }.bind(this));
    this.group = group;
  }

  get(name, config) {
    var child = null;
    if(this.deads[name].length > 0) {
      // console.log(">>>" + bulle);
      child = this.deads[name].splice(0, 1)[0];
      child.reborn(config);
    } else {
      // console.log("ok");
      this.group.add(child = new this.construcs[name](200, 400, config));
      //bullet =  Fishing.bulletGroup.children.slice(-1)[0];
    }
    return child;
  }

  kill(child) {
    child.kill();
        // console.log(this.deads[enemy.name].length + " | " + Fishing.enemyGroup.children.length);
    this.deads[child.name].push(child);
    // Fishing.enemyController.get(0);
  }
}
