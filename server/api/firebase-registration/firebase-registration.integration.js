'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newFirebaseRegistration;

describe('FirebaseRegistration API:', function() {
  describe('GET /api/firebase-registrations', function() {
    var firebaseRegistrations;

    beforeEach(function(done) {
      request(app)
        .get('/api/firebase-registrations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          firebaseRegistrations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      firebaseRegistrations.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/firebase-registrations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/firebase-registrations')
        .send({
          name: 'New FirebaseRegistration',
          info: 'This is the brand new firebaseRegistration!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newFirebaseRegistration = res.body;
          done();
        });
    });

    it('should respond with the newly created firebaseRegistration', function() {
      newFirebaseRegistration.name.should.equal('New FirebaseRegistration');
      newFirebaseRegistration.info.should.equal('This is the brand new firebaseRegistration!!!');
    });
  });

  describe('GET /api/firebase-registrations/:id', function() {
    var firebaseRegistration;

    beforeEach(function(done) {
      request(app)
        .get(`/api/firebase-registrations/${newFirebaseRegistration._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          firebaseRegistration = res.body;
          done();
        });
    });

    afterEach(function() {
      firebaseRegistration = {};
    });

    it('should respond with the requested firebaseRegistration', function() {
      firebaseRegistration.name.should.equal('New FirebaseRegistration');
      firebaseRegistration.info.should.equal('This is the brand new firebaseRegistration!!!');
    });
  });

  describe('PUT /api/firebase-registrations/:id', function() {
    var updatedFirebaseRegistration;

    beforeEach(function(done) {
      request(app)
        .put(`/api/firebase-registrations/${newFirebaseRegistration._id}`)
        .send({
          name: 'Updated FirebaseRegistration',
          info: 'This is the updated firebaseRegistration!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedFirebaseRegistration = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFirebaseRegistration = {};
    });

    it('should respond with the updated firebaseRegistration', function() {
      updatedFirebaseRegistration.name.should.equal('Updated FirebaseRegistration');
      updatedFirebaseRegistration.info.should.equal('This is the updated firebaseRegistration!!!');
    });

    it('should respond with the updated firebaseRegistration on a subsequent GET', function(done) {
      request(app)
        .get(`/api/firebase-registrations/${newFirebaseRegistration._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let firebaseRegistration = res.body;

          firebaseRegistration.name.should.equal('Updated FirebaseRegistration');
          firebaseRegistration.info.should.equal('This is the updated firebaseRegistration!!!');

          done();
        });
    });
  });

  describe('PATCH /api/firebase-registrations/:id', function() {
    var patchedFirebaseRegistration;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/firebase-registrations/${newFirebaseRegistration._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched FirebaseRegistration' },
          { op: 'replace', path: '/info', value: 'This is the patched firebaseRegistration!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedFirebaseRegistration = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedFirebaseRegistration = {};
    });

    it('should respond with the patched firebaseRegistration', function() {
      patchedFirebaseRegistration.name.should.equal('Patched FirebaseRegistration');
      patchedFirebaseRegistration.info.should.equal('This is the patched firebaseRegistration!!!');
    });
  });

  describe('DELETE /api/firebase-registrations/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/firebase-registrations/${newFirebaseRegistration._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when firebaseRegistration does not exist', function(done) {
      request(app)
        .delete(`/api/firebase-registrations/${newFirebaseRegistration._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
