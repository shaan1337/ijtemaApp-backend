'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newRegistration;

describe('Registration API:', function() {
  describe('GET /api/registrations', function() {
    var registrations;

    beforeEach(function(done) {
      request(app)
        .get('/api/registrations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          registrations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      registrations.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/registrations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/registrations')
        .send({
          name: 'New Registration',
          info: 'This is the brand new registration!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRegistration = res.body;
          done();
        });
    });

    it('should respond with the newly created registration', function() {
      newRegistration.name.should.equal('New Registration');
      newRegistration.info.should.equal('This is the brand new registration!!!');
    });
  });

  describe('GET /api/registrations/:id', function() {
    var registration;

    beforeEach(function(done) {
      request(app)
        .get(`/api/registrations/${newRegistration._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          registration = res.body;
          done();
        });
    });

    afterEach(function() {
      registration = {};
    });

    it('should respond with the requested registration', function() {
      registration.name.should.equal('New Registration');
      registration.info.should.equal('This is the brand new registration!!!');
    });
  });

  describe('PUT /api/registrations/:id', function() {
    var updatedRegistration;

    beforeEach(function(done) {
      request(app)
        .put(`/api/registrations/${newRegistration._id}`)
        .send({
          name: 'Updated Registration',
          info: 'This is the updated registration!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRegistration = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRegistration = {};
    });

    it('should respond with the updated registration', function() {
      updatedRegistration.name.should.equal('Updated Registration');
      updatedRegistration.info.should.equal('This is the updated registration!!!');
    });

    it('should respond with the updated registration on a subsequent GET', function(done) {
      request(app)
        .get(`/api/registrations/${newRegistration._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let registration = res.body;

          registration.name.should.equal('Updated Registration');
          registration.info.should.equal('This is the updated registration!!!');

          done();
        });
    });
  });

  describe('PATCH /api/registrations/:id', function() {
    var patchedRegistration;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/registrations/${newRegistration._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Registration' },
          { op: 'replace', path: '/info', value: 'This is the patched registration!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRegistration = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRegistration = {};
    });

    it('should respond with the patched registration', function() {
      patchedRegistration.name.should.equal('Patched Registration');
      patchedRegistration.info.should.equal('This is the patched registration!!!');
    });
  });

  describe('DELETE /api/registrations/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/registrations/${newRegistration._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when registration does not exist', function(done) {
      request(app)
        .delete(`/api/registrations/${newRegistration._id}`)
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
