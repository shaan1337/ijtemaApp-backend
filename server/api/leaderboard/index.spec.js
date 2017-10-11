'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var leaderboardCtrlStub = {
  index: 'leaderboardCtrl.index',
  show: 'leaderboardCtrl.show',
  create: 'leaderboardCtrl.create',
  upsert: 'leaderboardCtrl.upsert',
  patch: 'leaderboardCtrl.patch',
  destroy: 'leaderboardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var leaderboardIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './leaderboard.controller': leaderboardCtrlStub
});

describe('Leaderboard API Router:', function() {
  it('should return an express router instance', function() {
    leaderboardIndex.should.equal(routerStub);
  });

  describe('GET /api/leaderboard', function() {
    it('should route to leaderboard.controller.index', function() {
      routerStub.get
        .withArgs('/', 'leaderboardCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/leaderboard/:id', function() {
    it('should route to leaderboard.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'leaderboardCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/leaderboard', function() {
    it('should route to leaderboard.controller.create', function() {
      routerStub.post
        .withArgs('/', 'leaderboardCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/leaderboard/:id', function() {
    it('should route to leaderboard.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'leaderboardCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/leaderboard/:id', function() {
    it('should route to leaderboard.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'leaderboardCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/leaderboard/:id', function() {
    it('should route to leaderboard.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'leaderboardCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
