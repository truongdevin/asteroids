/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(5);
	var MovingObject = __webpack_require__(3);
	
	var canvasEl = document.getElementById("game-canvas");
	canvasEl.width = Game.DIM_X;
	canvasEl.height = Game.DIM_Y;
	
	var ctx = canvasEl.getContext("2d");
	var game = new Game();
	new GameView(game, ctx).start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(2);
	var Ship = __webpack_require__(6);
	
	var Game = function () {
	  this.asteroids = [];
	  this.ships = [];
	
	  // this.addShip();
	  this.addAsteroids();
	}
	
	Game.BG_COLOR="black";
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	Game.NUM_ASTEROIDS = 4;
	
	Game.prototype.addAsteroids = function() {
	  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    var a = new Asteroid({pos: this.randomPosition(), game: this});
	    this.asteroids.push(a);
	  }
	};
	
	Game.prototype.addShip = function() {
	  var ship = new Ship({
	    pos: this.randomPosition(),
	    game: this
	  });
	  this.ships.push(ship);
	  return ship;
	};
	
	Game.prototype.allObjects = function () {
	  return this.asteroids.concat(this.ships);
	};
	
	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);
	
	  // this.asteroids.forEach(function(asteroid) {
	  //   asteroid.draw(ctx);
	  // });
	
	  this.allObjects().forEach(function(object) {
	    object.draw(ctx);
	  });
	};
	
	Game.prototype.moveObjects = function () {
	  // this.asteroids.forEach(function(asteroid) {
	  //   asteroid.move();
	  // });
	  this.allObjects().forEach(function(object) {
	    object.move();
	  });
	
	};
	
	Game.prototype.randomPosition = function() {
	  var x = Game.DIM_X * Math.random();
	  var y = Game.DIM_Y * Math.random();
	  return [x, y];
	};
	
	Game.prototype.wrap = function (pos) {
	  pos[0] = pos[0] > 0 ? pos[0] % Game.DIM_X : Game.DIM_X
	  pos[1] = pos[1] > 0 ? pos[1] % Game.DIM_Y : Game.DIM_Y
	
	  return [pos[0], pos[1]];
	};
	
	Game.prototype.checkCollosions = function () {
	  var self = this;
	  // this.asteroids.forEach(function(asteroid1) {
	  //   self.asteroids.forEach(function(asteroid2) {
	  //     if (asteroid1 === asteroid2) {
	  //       return;
	  //     }
	  //
	  //     if (asteroid1.isCollidedWith(asteroid2)) {
	  //       asteroid1.collideWith(asteroid2);
	  //       console.log("COLLIDED");
	  //     }
	  //   });
	  // });
	  //
	  this.allObjects().forEach(function(object1) {
	    self.allObjects().forEach(function(object2) {
	      if (object1 === object2) {
	        return;
	      }
	
	      if (object1.isCollidedWith(object2)) {
	        object1.collideWith(object2);
	        console.log("COLLIDED");
	      }
	    });
	  });
	};
	
	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollosions();
	};
	
	Game.prototype.remove = function (asteroid) {
	  var idx = this.asteroids.indexOf(asteroid);
	  this.asteroids.splice(idx,1);
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	
	var Asteroid = function (hash) {
	  hash.color = hash.color || "white"; // red , crimson, aqua
	  hash.radius = hash.radius || 10;
	  hash.vel = hash.vel || Util.randomVec(5);
	  MovingObject.call(this, hash);
	}
	
	Util.inherits(Asteroid, MovingObject);
	
	module.exports = Asteroid;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	var MovingObject = function (hash) {
	  this.pos = hash['pos'];
	  this.vel = hash['vel'];
	  this.radius = hash['radius'];
	  this.color = hash['color'];
	  this.game = hash['game'];
	}
	
	MovingObject.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	
	  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
	  ctx.fill();
	};
	
	MovingObject.prototype.move = function() {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.game.wrap(this.pos);
	};
	
	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  var distance = Math.sqrt(
	    Math.pow(this.pos[0]-otherObject.pos[0],2) + Math.pow(this.pos[1]-otherObject.pos[1],2)
	  );
	  return distance < (this.radius + otherObject.radius);
	};
	
	MovingObject.prototype.collideWith = function (otherObject) {
	  this.game.remove(otherObject);
	  this.game.remove(this);
	};
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	  inherits: function (ChildClass, ParentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = ParentClass.prototype;
	    ChildClass.prototype = new Surrogate;
	    ChildClass.prototype.constructor = ChildClass;
	  },
	
	  randomVec: function (length) {
	    var deg = 2*Math.PI*Math.random();
	    var plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
	    var plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
	    var x = Math.random()*length * plusOrMinusX;
	    var y = Math.sqrt(length*length - x*x) * plusOrMinusY;
	    return [x,y];
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	
	var GameView = function (game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	  this.ship = this.game.addShip();
	};
	
	GameView.prototype.start = function (canvasEl) {
	    // var ctx = canvasEl.getContext("2d");
	    // var game = new Game();
	
	    // var refresh = function() {
	    //   game.moveObjects();
	    //   game.draw(ctx);
	    // };
	    this.bindKeyHandlers();
	    var self = this;
	    var refresh = function() {
	      // self.game.moveObjects();
	      self.game.step();
	      // self.game.checkCollosions();
	      self.game.draw(self.ctx);
	    };
	
	    setInterval(refresh,20);
	};
	
	GameView.prototype.bindKeyHandlers = function () {
	  var ship = this.ship;
	  key('w', function() {ship.power([0,-1])});
	  key('a', function() {ship.power([-1,0])});
	  key('s', function() {ship.power([0,1])});
	  key('d', function() {ship.power([1,0])});
	};
	
	
	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	
	var Ship = function (hash) {
	  hash.color = hash.color || "red"; // red , crimson, aqua
	  hash.radius = hash.radius || 15;
	  hash.vel = [0,0];
	  MovingObject.call(this, hash);
	};
	Util.inherits(Ship, MovingObject);
	
	Ship.prototype.power = function (impulse) {
	  this.vel[0] += impulse[0];
	  this.vel[1] += impulse[1];
	};
	
	Ship.prototype.move = function() {
	  this.vel[0]*=0.99;
	  this.vel[1]*=0.99;
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.game.wrap(this.pos);
	};
	
	
	module.exports = Ship;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map