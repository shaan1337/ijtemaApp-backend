'use strict';

describe('Component: NewsComponent', function() {
  // load the controller's module
  beforeEach(module('ijtemaAppBackendApp.news'));

  var NewsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    NewsComponent = $componentController('news', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
