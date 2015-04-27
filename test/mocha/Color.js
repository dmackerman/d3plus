var assert = require("assert"),
    Color = require("../../src/Color/Color.js");

describe("Color", function(){

  // Tests pertaining to the construction of new Color objects.
  describe("constructor", function(){

    // Tests normal hex parsing (pass-through).
    describe("hex parsing", function(){
      for (let hex of ["#cc0000", "#00ff00", "#000088"])
        it(hex, function(){
          assert.strictEqual(hex, new Color(hex).hex);
        });
    });

    // Tests for missing values.
    describe("missing value parsing", function(){
      for (let hex of [null, undefined])
        it(hex, function(){
          assert.strictEqual("#cccccc", new Color(hex).hex);
        });
    });

    // Tests true/false booleans.
    describe("boolean parsing", function(){
      it("true", function(){
        assert.strictEqual("#224f20", new Color(true).hex);
      });
      it("false", function(){
        assert.strictEqual("#b22200", new Color(false).hex);
      });
    });

    // Tests mapping strings and numbers to the default color scale.
    describe("mapping to color scale", function(){
      var scale = ["#b22200", "#eace3f", "#282f6b", "#b35c1e"],
          values = ["Alpha", "Beta", 45, 85];
      values.forEach(function(value, i){
        it(value, function(){
          assert.strictEqual(scale[i], new Color(value).hex);
        });
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
          assert.strictEqual("#f7f7f7", new Color(hex).text());
        });
      }
    });

    // Tests that specific colors are light enough to return black.
    describe("light colors", function(){
      for (let hex of ["#fff", "#888", "#fcc", "#8c8", "#990", "#0bb", "#fcf"]) {
        it(hex, function(){
          assert.strictEqual("#444444", new Color(hex).text());
        });
      }
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

});
