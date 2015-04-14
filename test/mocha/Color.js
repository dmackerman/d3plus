var assert = require("assert"),
    Color = require("../../src/Color/Color.js");

describe("Color", function(){
  describe("#constructor", function(){
    it("should parse hex exactly as passed", function(){
      for (let hex of ["#cc0000", "#00ff00", "#000088"])
        assert.equal(hex, new Color(hex).hex);
    });
  });
});
