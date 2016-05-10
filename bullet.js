var MovingObject = require("./movingObject");
var Util = require("./util");
var Ship = require("./ship");

var Bullet = function (hash) {
  hash.color = hash.color || "red"; // red , crimson, aqua
  hash.radius = 5;
  // hash.vel = [0,0];
  MovingObject.call(this, hash);
};

Bullet.prototype.type = "Bullet";

Util.inherits(Bullet, MovingObject);

Bullet.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

Bullet.prototype.collideWith = function (object) {
  if (object.type === "Asteroid") {
    object.remove();
    this.remove();
  }
};


module.exports = Bullet;
