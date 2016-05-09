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
