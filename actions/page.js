/**
 * Copyright (c) 2015 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('Example:PageAction');
var ContentStore = require('../stores/ContentStore');
var defaultPageTitle = 'Default Page Title';

function dispatchActions(context, resource, title, content) {
  context.dispatch('RECEIVE_PAGE_CONTENT', {
    resource: resource,
    content: content
  });

  context.dispatch('UPDATE_PAGE_TITLE', {
    title: title
  });  
}

function page(context, payload, done) {
  var title = (payload.pageTitle || defaultPageTitle);

  // Try cache first
  var content = context.getStore(ContentStore).get(payload.resource);
  if (content) {
    debug('Found '+payload.resource+' in cache');
    dispatchActions(context, payload.resource, title, content);
  }

  debug('Page service request start');
  context.service.read('page', payload, {}, function(err, data) {
    debug('Page service request complete');

    if (err) {
      return done(err);
    }

    if (!data) {
      var noData = new Error('Page not found');
      noData.statusCode = 404;
      return done(noData);
    }

    dispatchActions(context, payload.resource, title, data);

    return done();
  });  
}

module.exports = page;