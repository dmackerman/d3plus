var assert = require("assert"),
    Color = require("../../src/Color/Color.js"),
    settings = require("../../src/settings/color.js");

describe("Color", function(){

  // Tests pertaining to the construction of new Color objects.
  describe("constructor", function(){

    // Tests normal hex parsing (pass-through).
    describe("hex parsing", function(){
      for (let hex of ["#000000", "#cc0000", "#00ff00", "#000088"])
        it(hex, function(){
          assert.strictEqual(hex, new Color(hex).hex);
        });
    });

    // Tests for missing values.
    describe("missing value parsing", function(){
      for (let hex of [null, undefined])
        it(hex, function(){
          assert.strictEqual(settings.missing, new Color(hex).hex);
        });
    });

    // Tests true/false booleans.
    describe("boolean parsing", function(){
      it("true", function(){
        assert.strictEqual(settings.on, new Color(true).hex);
      });
      it("false", function(){
        assert.strictEqual(settings.off, new Color(false).hex);
      });
    });

    // Tests mapping strings and numbers to the default color scale.
    describe("mapping to color scale", function(){
      var scale = settings.scale.range(),
          values = ["Alpha", "Beta", 45, 85];
      values.forEach(function(value, i){
        it(value, function(){
          assert.strictEqual(scale[i], new Color(value).hex);
        });
      });
    });

  });

  // Tests for the color legible function.
  describe("legible", function(){

    var d = ["#ffaaaa", "#ccffcc", "#ccccff"],
        l = ["#cf1717", "#17cf17", "#1717cf"];
    d.forEach(function(hex, i){
      it(hex, function(){
        assert.strictEqual(l[i], new Color(hex).legible());
      });
    });

  });

  // Tests for the color lightening function.
  describe("lighter", function(){

    var d = ["#440000", "#004400", "#000044"],
        l = ["#cf5252", "#52cf52", "#5252cf"];
    d.forEach(function(hex, i){
      it(hex, function(){
        assert.strictEqual(l[i], new Color(hex).lighter());
      });
    });

  });

  // Tests pertaining to the text color function. Each color should return
  // either white or black, depending on the "darkness" of the color.
  describe("text", function(){

    // Tests that specific colors are dark enough to return white.
    describe("dark colors", function(){
      for (let hex of ["#000", "#777", "#c00", "#0b0", "#00f", "#880", "#0aa", "#c0c"]) {
        it(hex, function(){
          assert.strictEqual(settings.light, new Color(hex).text());
        });
      }
    });

    // Tests that specific colors are light enough to return black.
    describe("light colors", function(){
      for (let hex of ["#fff", "#888", "#fcc", "#8c8", "#990", "#0bb", "#fcf"]) {
        it(hex, function(){
          assert.strictEqual(settings.dark, new Color(hex).text());
        });
      }
    });

  });

  // Tests pertaining to the color validation function.
  describe("validate", function(){

    describe("valid colors", function(){
      for (let color of ["#000", "#000000", "black", "#f00", "#ff0000", "rgb(255,0,0)", "red", "hsl(0, 100%, 50%)"]) {
        it(color, function(){
          assert.strictEqual(true, new Color(color).validate());
        });
      }
    });

    describe("invalid colors", function(){
      for (let color of ["Text", 45, true, false, null, undefined]) {
        it(color, function(){
          assert.strictEqual(false, new Color(color).validate());
        });
      }
    });

  });

});
