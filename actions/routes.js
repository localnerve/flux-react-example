/**
 * Copyright (c) 2015 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('Example:RoutesAction');
var createFluxibleRouteTransformer = require('../utils').createFluxibleRouteTransformer;

function routes (context, payload, done) {
  var transformer = (typeof payload.transform === 'function' ?
        payload.transform : createFluxibleRouteTransformer({
          actions: require('./')
        }).jsonToFluxible);

  if (payload.routes) {
    var fluxibleRoutes = payload.routes;

    if (payload.transform) {
      debug('transforming routes');

      fluxibleRoutes = transformer(payload.routes);
    }

    context.dispatch('RECEIVE_ROUTES', fluxibleRoutes);
    return done();
  }

  debug('Routes request start');
  context.service.read('routes', payload, {}, function (err, routes) {
    debug('Routes request complete');

    if (err) {
      return done(err);
    }

    var fluxibleRoutes = transformer(routes);
    context.dispatch('RECEIVE_ROUTES', fluxibleRoutes);
    done(null, fluxibleRoutes);
  });
}

module.exports = routes;
