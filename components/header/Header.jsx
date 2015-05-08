/**
 * Copyright (c) 2015 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');

var Ribbon = require('./Ribbon.jsx');
var Logo = require('./Logo.jsx');
var Nav = require('./Nav.jsx');

var Header = React.createClass({
  render: function() {
    return (
      <header className="app-header">
        <Ribbon
          business={this.props.models.LocalBusiness}
          social={this.props.models.SiteInfo.social}
        />
        <Logo site={this.props.models.SiteInfo.site} />
        <Nav selected={this.props.selected} links={this.props.links} />
      </header>
    );
  }
});

module.exports = Header;
