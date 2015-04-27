var d3 = require("d3"),
    settings = require("../settings/color.js");

/**
* D3plus custom Color element.
*
* @class Color
* @constructor
*/
var Color = class {

  constructor(color, defaults) {

    this.value = color;
    this.defaults = defaults || settings;

    // If the color value is null  or undefined, set to grey.
    if ([null, undefined].indexOf(color) >= 0) {
      this.color = this.defaults.missing;
    }
    // Else if the color is true, set to green.
    else if (color === true) {
      this.color = this.defaults.on;
    }
    // Else if the color is false, set to red.
    else if (color === false) {
      this.color = this.defaults.off;
    }
    // Else if the color is not a valid color string, use the color scale.
    else if (!this.validate()) {
      this.color = this.defaults.scale(color);
    }
    else {
      this.color = color;
    }

  }

  // Returns the hexidecimal value.
  hex() {
    return this.toString();
  }

  // Returns the D3 hsl object.
  hsl() {
    return this.rgb().hsl();
  }

  // Darkens the color if it is too light to appear on white.
  legible() {
    var c = this.hsl();
    if (c.l > .45) {
      if (c.s > .8) { c.s = 0.8; }
      c.l = 0.45;
    }
    return new Color(c.toString());
  }

  // Lightens the color while also reducing the saturation.
  lighter(i) {
    if (!i) { i = 0.5; }
    var c = this.hsl();
    i = (1 - c.l) * i;
    c.l += i; c.s -= i;
    return new Color(c.toString());
  }

  opacity() {
    var c = this.color.replace(RegExp(" ", "g"), "").toLowerCase();
    if (c.indexOf("hsla(") === 0 || c.indexOf("rgba(") === 0) {
      return parseFloat(c.split(")")[0].split(",")[3], 10);
    }
    else {
      return 1;
    }
  }

  // Returns the D3 rgb object.
  rgb() {
    return d3.rgb(this.color);
  }

  // Analyzes the color and determines an appropriate color for text to be
  // placed on top of the color.
  text() {
    var rgb = this.rgb(), r = rgb.r, g = rgb.g, b = rgb.b,
        yiq = (r * 299 + g * 587 + b * 114) / 1000,
        c = yiq >= 128 ? this.defaults.dark : this.defaults.light;
    return new Color(c);
  }

  // Pass-through method for D3 toString function.
  toString() {
    return this.rgb().toString();
  }

  // Returns true if the user value is a valid color and not black.
  validate() {

    var color = this.value;
    // Returns true if the variable is not a String.
    if (!color || color.constructor !== String) {
      return false;
    }
    // Removes spaces and capitals if variable is a string.
    else {
      color = color.replace(RegExp(" ", "g"), "").toLowerCase();
    }

    var black;
    if (color.indexOf("hsl") === 0 || color.indexOf("rgb") === 0) {

      var values = color.split("(")[1].split(",").slice(0, 3).map(function(n){
        return parseFloat(n, 10);
      });

      // Checks luminosity if variable is hsl or hsla.
      if (color.indexOf("hsl") === 0) {
        black = values[2] === 0;
        color = d3.rgb("hsl("+values.join(",")+")");
      }
      // Variable is black if the sum of all 3 rgb color channels is 0.
      else {
        black = d3.sum(values) === 0;
        color = d3.rgb("rgb("+values.join(",")+")");
      }

    }
    else {
      black = ["black", "#000", "#000000"].indexOf(color) >= 0;
    }

    // Compares variable to name and hex versions of black.
    return d3.rgb(color).toString() !== "#000000" || black;

  }

};

module.exports = Color;
