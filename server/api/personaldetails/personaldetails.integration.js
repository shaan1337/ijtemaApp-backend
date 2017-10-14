'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPersonaldetails;

describe('Personaldetails API:', function() {
  describe('GET /api/personaldetails', function() {
    var personaldetailss;

    beforeEach(function(done) {
      request(app)
        .get('/api/personaldetails')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          personaldetailss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      personaldetailss.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/personaldetails', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/personaldetails')
        .send({
          name: 'New Personaldetails',
          info: 'This is the brand new personaldetails!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPersonaldetails = res.body;
          done();
        });
    });

    it('should respond with the newly created personaldetails', function() {
      newPersonaldetails.name.should.equal('New Personaldetails');
      newPersonaldetails.info.should.equal('This is the brand new personaldetails!!!');
    });
  });

  describe('GET /api/personaldetails/:id', function() {
    var personaldetails;

    beforeEach(function(done) {
      request(app)
        .get(`/api/personaldetails/${newPersonaldetails._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          personaldetails = res.body;
          done();
        });
    });

    afterEach(function() {
      personaldetails = {};
    });

    it('should respond with the requested personaldetails', function() {
      personaldetails.name.should.equal('New Personaldetails');
      personaldetails.info.should.equal('This is the brand new personaldetails!!!');
    });
  });

  describe('PUT /api/personaldetails/:id', function() {
    var updatedPersonaldetails;

    beforeEach(function(done) {
      request(app)
        .put(`/api/personaldetails/${newPersonaldetails._id}`)
        .send({
          name: 'Updated Personaldetails',
          info: 'This is the updated personaldetails!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPersonaldetails = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPersonaldetails = {};
    });

    it('should respond with the updated personaldetails', function() {
      updatedPersonaldetails.name.should.equal('Updated Personaldetails');
      updatedPersonaldetails.info.should.equal('This is the updated personaldetails!!!');
    });

    it('should respond with the updated personaldetails on a subsequent GET', function(done) {
      request(app)
        .get(`/api/personaldetails/${newPersonaldetails._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let personaldetails = res.body;

          personaldetails.name.should.equal('Updated Personaldetails');
          personaldetails.info.should.equal('This is the updated personaldetails!!!');

          done();
        });
    });
  });

  describe('PATCH /api/personaldetails/:id', function() {
    var patchedPersonaldetails;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/personaldetails/${newPersonaldetails._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Personaldetails' },
          { op: 'replace', path: '/info', value: 'This is the patched personaldetails!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPersonaldetails = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPersonaldetails = {};
    });

    it('should respond with the patched personaldetails', function() {
      patchedPersonaldetails.name.should.equal('Patched Personaldetails');
      patchedPersonaldetails.info.should.equal('This is the patched personaldetails!!!');
    });
  });

  describe('DELETE /api/personaldetails/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/personaldetails/${newPersonaldetails._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when personaldetails does not exist', function(done) {
      request(app)
        .delete(`/api/personaldetails/${newPersonaldetails._id}`)
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
