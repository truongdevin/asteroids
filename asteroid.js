var MovingObject = require("./movingObject");
var Util = require("./util");

var Asteroid = function (hash) {
  hash.color = hash.color || "white"; // red , crimson, aqua
  hash.radius = hash.radius || 10;
  hash.vel = hash.vel || Util.randomVec(5);
  MovingObject.call(this, hash);
}
Util.inherits(Asteroid, MovingObject);
Asteroid.prototype.type = "Asteroid";

module.exports = Asteroid;
