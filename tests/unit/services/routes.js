/**
 * Copyright (c) 2015 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
/* global describe, it */
'use strict';
var expect = require('chai').expect;
var routes = require('../../../services/routes.js');
// delete require.cache[require.resolve('../../fixtures/routes-response')];
var routesResponse = require('../../fixtures/routes-response');

describe('routes', function() {
  it('should have name and read members', function() {
    expect(routes.name).to.be.a('string');
    expect(routes.read).to.be.a('function');
  });

  // TODO: mock properly
  it('should return a valid response', function(done) {
    routes.read(null, null, null, null, function(err, routes) {
      if (err) {
        done(err);
      }      
      expect(routes).to.be.an('object');
      expect(JSON.stringify(routesResponse.home)).to.equal(JSON.stringify(routes.home));
      done();
    });
  });
});