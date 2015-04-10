(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var d3plus = {};
if (typeof window !== "undefined") {
  window.d3plus = d3plus;
}
module.exports = d3plus;

d3plus.version = "2.0.0 - Green";

d3plus.Color = require("./Color/Color.js");

},{"./Color/Color.js":2}],2:[function(require,module,exports){
"use strict";

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

module.exports = (function () {
  var _class = (function (_class2) {
    function _class(_x) {
      return _class2.apply(this, arguments);
    }

    _class.toString = function () {
      return _class2.toString();
    };

    return _class;
  })(function (color) {
    _classCallCheck(this, _class);

    this.color = color;
  });

  _createClass(_class, [{
    key: "validate",
    value: function validate() {
      return this.color;
    }
  }]);

  return _class;
})();

},{}]},{},[1]);
