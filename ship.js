var MovingObject = require("./movingObject");
var Util = require("./util");

var Ship = function (hash) {
  hash.color = hash.color || "red"; // red , crimson, aqua
  hash.radius = hash.radius || 15;
  hash.vel = [0,0];
  MovingObject.call(this, hash);
}

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}

Util.inherits(Ship, MovingObject);

module.exports = Ship;
