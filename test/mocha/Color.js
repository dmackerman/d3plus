var assert = require("assert"),
    Color = require("../../src/Color/Color.js");

describe("Color", function(){

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

});
