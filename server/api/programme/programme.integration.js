'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newProgramme;

describe('Programme API:', function() {
  describe('GET /api/programme', function() {
    var programmes;

    beforeEach(function(done) {
      request(app)
        .get('/api/programme')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          programmes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      programmes.should.be.instanceOf(Array);
    });
  });
});
