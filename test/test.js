var assert = require('assert');
var $ = require('jquery');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 dfhdmhhfgwhen the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
  describe('Should be two input fields', function() {
    $('input');
    it('should return -1 dfhdmhhfgwhen the value is not present', function() {
      var res = $('input').length;
      expect(res).to.eql(2);
    });
  });
});
