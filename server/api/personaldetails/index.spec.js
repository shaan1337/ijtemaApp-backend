'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var personaldetailsCtrlStub = {
  index: 'personaldetailsCtrl.index',
  show: 'personaldetailsCtrl.show',
  create: 'personaldetailsCtrl.create',
  upsert: 'personaldetailsCtrl.upsert',
  patch: 'personaldetailsCtrl.patch',
  destroy: 'personaldetailsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var personaldetailsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './personaldetails.controller': personaldetailsCtrlStub
});

describe('Personaldetails API Router:', function() {
  it('should return an express router instance', function() {
    personaldetailsIndex.should.equal(routerStub);
  });

  describe('GET /api/personaldetails', function() {
    it('should route to personaldetails.controller.index', function() {
      routerStub.get
        .withArgs('/', 'personaldetailsCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/personaldetails/:id', function() {
    it('should route to personaldetails.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'personaldetailsCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/personaldetails', function() {
    it('should route to personaldetails.controller.create', function() {
      routerStub.post
        .withArgs('/', 'personaldetailsCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/personaldetails/:id', function() {
    it('should route to personaldetails.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'personaldetailsCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/personaldetails/:id', function() {
    it('should route to personaldetails.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'personaldetailsCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/personaldetails/:id', function() {
    it('should route to personaldetails.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'personaldetailsCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
