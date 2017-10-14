'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var registrationCtrlStub = {
  index: 'registrationCtrl.index',
  show: 'registrationCtrl.show',
  create: 'registrationCtrl.create',
  upsert: 'registrationCtrl.upsert',
  patch: 'registrationCtrl.patch',
  destroy: 'registrationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var registrationIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './registration.controller': registrationCtrlStub
});

describe('Registration API Router:', function() {
  it('should return an express router instance', function() {
    registrationIndex.should.equal(routerStub);
  });

  describe('GET /api/registrations', function() {
    it('should route to registration.controller.index', function() {
      routerStub.get
        .withArgs('/', 'registrationCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/registrations/:id', function() {
    it('should route to registration.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'registrationCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/registrations', function() {
    it('should route to registration.controller.create', function() {
      routerStub.post
        .withArgs('/', 'registrationCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/registrations/:id', function() {
    it('should route to registration.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'registrationCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/registrations/:id', function() {
    it('should route to registration.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'registrationCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/registrations/:id', function() {
    it('should route to registration.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'registrationCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
