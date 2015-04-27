var d3 = require("d3"),
    settings = require("../settings/color.js");

var notBlack = function(color) {

  // Returns true if the variable is not a String.
  if (color.constructor !== String) {
    return true;
  }
  // Removes spaces and capitals if variable is a string.
  else {
    color = color.replace(RegExp(" ", "g"), "").toLowerCase();
  }

  // Checks luminosity if variable is hsl or hsla.
  if (color.indexOf("hsl(") === 0 || color.indexOf("hsla(") === 0) {
    return parseFloat(color.split(",")[2], 10) !== 0;
  }
  // Checks rgb channels if variable is rgb or rgba.
  else if (color.indexOf("rgb(") === 0 || color.indexOf("rgba(") === 0) {
    // Variable is black if the sum of all 3 color channels is 0.
    return d3.sum(color.split("(")[1].split(",").slice(0, 3).map(function(n){
      return parseFloat(n, 10);
    })) > 0;
  }

  // Compares variable to name and hex versions of black.
  return ["black", "#000", "#000000"].indexOf(color) < 0;

};

/**
* D3plus custom Color element.
*
* @class Color
* @constructor
*/
module.exports = class {

  constructor(color, defaults) {

    this.value = color;
    this.defaults = defaults || settings;

    // If the color value is null  or undefined, set to grey.
    if ([null, undefined].indexOf(color) >= 0) {
      color = this.defaults.missing;
    }
    // Else if the color is true, set to green.
    else if (color === true) {
      color = this.defaults.on;
    }
    // Else if the color is false, set to red.
    else if (color === false) {
      color = this.defaults.off;
    }

    // Tries to parse the color through the d3.rgb function.
    this.rgb = d3.rgb(color);

    // d3.rgb returns a hex value of "#000000" for any value it cannot
    // validate as a color. Therefore, if d3.rgb returns "#000000" and the user
    // did not pass black as a value (determined by the "notBlack" function),
    // the color value is determined from the default color scale.
    if (this.rgb.toString() === "#000000" && notBlack(color)) {
      this.rgb = d3.rgb(this.defaults.scale(color));
    }

    this.hex = this.rgb.toString();
    this.hsl = this.rgb.hsl();

  }

  // Darkens the color if it is too light to appear on white.
  legible() {
    var c = this.hsl;
    if (c.l > .45) {
      if (c.s > .8) { c.s = 0.8; }
      c.l = 0.45;
    }
    return c.toString();
  }

  // Lightens the color while also reducing the saturation.
  lighter(i) {
    if (!i) { i = 0.5; }
    var c = this.hsl;
    i = (1 - c.l) * i;
    c.l += i; c.s -= i;
    return c.toString();
  }

  // Analyzes the color and determines an appropriate color for text to be
  // placed on top of the color.
  text() {
    var r = this.rgb.r, g = this.rgb.g, b = this.rgb.b;
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? this.defaults.dark : this.defaults.light;
  }

};
