/**
 * Copyright (c) 2015 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('Example:RoutesService');

// Temporary.
// This is a prototype for a service response model.
var _routes = {
  home: {
    path: '/',
    method: 'get',
    page: 'home',
    label: 'Home',
    action: {
      name: 'example',
      params: {      
        resource: 'cms',
        key: 'path/to/home',      
        pageTitle: 'Flux React Example | An Example Isomorphic Application'
      }
    }
  }
};

module.exports = {
  name: 'routes',
  // at least one of the CRUD methods is required
  read: function(req, resource, params, config, callback) {
    debug('initiating routes request');
    // TODO: Replace with request to backend
    setTimeout(function () {
      callback(null, JSON.parse(JSON.stringify(_routes)));
    }, 10);
  }
  
  // create: function(req, resource, params, body, config, callback) {},
  // update: function(resource, params, body, config, callback) {},
  // delete: function(resource, params, config, callback) {}
};