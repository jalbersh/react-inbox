var App = require('./App');

describe('App', function() {
  describe('Check functionality', function() {
    it('does something', function() {
       expect(new App().toEqual(0));
    });
  });
});