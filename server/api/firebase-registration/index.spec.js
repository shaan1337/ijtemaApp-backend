'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var firebaseRegistrationCtrlStub = {
  index: 'firebaseRegistrationCtrl.index',
  show: 'firebaseRegistrationCtrl.show',
  create: 'firebaseRegistrationCtrl.create',
  upsert: 'firebaseRegistrationCtrl.upsert',
  patch: 'firebaseRegistrationCtrl.patch',
  destroy: 'firebaseRegistrationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var firebaseRegistrationIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './firebase-registration.controller': firebaseRegistrationCtrlStub
});

describe('FirebaseRegistration API Router:', function() {
  it('should return an express router instance', function() {
    firebaseRegistrationIndex.should.equal(routerStub);
  });

  describe('GET /api/firebase-registrations', function() {
    it('should route to firebaseRegistration.controller.index', function() {
      routerStub.get
        .withArgs('/', 'firebaseRegistrationCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/firebase-registrations/:id', function() {
    it('should route to firebaseRegistration.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'firebaseRegistrationCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/firebase-registrations', function() {
    it('should route to firebaseRegistration.controller.create', function() {
      routerStub.post
        .withArgs('/', 'firebaseRegistrationCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/firebase-registrations/:id', function() {
    it('should route to firebaseRegistration.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'firebaseRegistrationCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/firebase-registrations/:id', function() {
    it('should route to firebaseRegistration.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'firebaseRegistrationCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/firebase-registrations/:id', function() {
    it('should route to firebaseRegistration.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'firebaseRegistrationCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
