'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newLeaderboard;

describe('Leaderboard API:', function() {
  describe('GET /api/leaderboard', function() {
    var leaderboards;

    beforeEach(function(done) {
      request(app)
        .get('/api/leaderboard')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          leaderboards = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      leaderboards.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/leaderboard', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/leaderboard')
        .send({
          name: 'New Leaderboard',
          info: 'This is the brand new leaderboard!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLeaderboard = res.body;
          done();
        });
    });

    it('should respond with the newly created leaderboard', function() {
      newLeaderboard.name.should.equal('New Leaderboard');
      newLeaderboard.info.should.equal('This is the brand new leaderboard!!!');
    });
  });

  describe('GET /api/leaderboard/:id', function() {
    var leaderboard;

    beforeEach(function(done) {
      request(app)
        .get(`/api/leaderboard/${newLeaderboard._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          leaderboard = res.body;
          done();
        });
    });

    afterEach(function() {
      leaderboard = {};
    });

    it('should respond with the requested leaderboard', function() {
      leaderboard.name.should.equal('New Leaderboard');
      leaderboard.info.should.equal('This is the brand new leaderboard!!!');
    });
  });

  describe('PUT /api/leaderboard/:id', function() {
    var updatedLeaderboard;

    beforeEach(function(done) {
      request(app)
        .put(`/api/leaderboard/${newLeaderboard._id}`)
        .send({
          name: 'Updated Leaderboard',
          info: 'This is the updated leaderboard!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLeaderboard = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLeaderboard = {};
    });

    it('should respond with the updated leaderboard', function() {
      updatedLeaderboard.name.should.equal('Updated Leaderboard');
      updatedLeaderboard.info.should.equal('This is the updated leaderboard!!!');
    });

    it('should respond with the updated leaderboard on a subsequent GET', function(done) {
      request(app)
        .get(`/api/leaderboard/${newLeaderboard._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let leaderboard = res.body;

          leaderboard.name.should.equal('Updated Leaderboard');
          leaderboard.info.should.equal('This is the updated leaderboard!!!');

          done();
        });
    });
  });

  describe('PATCH /api/leaderboard/:id', function() {
    var patchedLeaderboard;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/leaderboard/${newLeaderboard._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Leaderboard' },
          { op: 'replace', path: '/info', value: 'This is the patched leaderboard!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLeaderboard = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLeaderboard = {};
    });

    it('should respond with the patched leaderboard', function() {
      patchedLeaderboard.name.should.equal('Patched Leaderboard');
      patchedLeaderboard.info.should.equal('This is the patched leaderboard!!!');
    });
  });

  describe('DELETE /api/leaderboard/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/leaderboard/${newLeaderboard._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when leaderboard does not exist', function(done) {
      request(app)
        .delete(`/api/leaderboard/${newLeaderboard._id}`)
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
