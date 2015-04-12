/**
* D3plus custom Color element.
*
* @class Color
* @constructor
*/
module.exports = class {
  constructor(color) {
    this.color = color;
  }
  validate() {
    return this.color;
  }
};
