'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var programmeCtrlStub = {
  index: 'programmeCtrl.index',
  show: 'programmeCtrl.show',
  create: 'programmeCtrl.create',
  upsert: 'programmeCtrl.upsert',
  patch: 'programmeCtrl.patch',
  destroy: 'programmeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var programmeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './programme.controller': programmeCtrlStub
});

describe('Programme API Router:', function() {
  it('should return an express router instance', function() {
    programmeIndex.should.equal(routerStub);
  });

  describe('GET /api/programme', function() {
    it('should route to programme.controller.show', function() {
      routerStub.get
        .withArgs('/', 'programmeCtrl.show')
        .should.have.been.calledOnce;
    });
  });
});
