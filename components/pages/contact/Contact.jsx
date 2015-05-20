/**
 * Copyright (c) 2015 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var cx = require('classnames');
var ContactStore = require('../../../stores/ContactStore');
var contactAction = require('../../../actions/contact');
var ContactSteps = require('./Steps.jsx');
var ContactNav = require('./Nav.jsx');
var elements = require('./elements');

var Contact = React.createClass({
  mixins: [ FluxibleMixin ],
  statics: {
    storeListeners: [ ContactStore ]
  },
  propTypes: {
    name: React.PropTypes.string,
    headingText: React.PropTypes.string.isRequired,
    stepFinal: React.PropTypes.number.isRequired,
    steps: React.PropTypes.array.isRequired,
    resultMessageFail: React.PropTypes.string.isRequired,
    resultMessageSuccess: React.PropTypes.string.isRequired,
    navigation: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    var state = this.getStateFromStore();
    state.step = 0;
    state.direction = 'next';
    return state;
  },
  setInputElement: function (component) {
    if (component) {
      this.inputElement = component;
    }
  },
  render: function () {
    if (!this.props.steps || this.props.steps.length === 0) {
      return null;
    }

    var step = this.props.steps[this.state.step];

    var contactElement = elements.createElement(step.name, {
      fieldValue: this.state.fields[step.name] || null,
      setInputReference: this.setInputElement,
      label: step.label,
      key: step.name,
      message: step.message,
      business: this.props.models.LocalBusiness,
      failure: this.state.failure,
      failedMessage: this.state.fields.message
    });

    return (
      <div className="page">
        <div className="grid-container-center page-content">
          <h2>{this.props.headingText}</h2>
          <ReactCSSTransitionGroup
            component="div"
            className="contact-anim-container"
            transitionLeave={false}
            transitionName={'contact-anim-' + this.state.direction}>
            <div className="contact-anim" key={step.name}>
              <p className={cx({
                'contact-intro': true,
                hide: this.state.step === this.props.stepFinal
                })}>
                {step.introduction.text}
              </p>
              <ContactSteps
                steps={this.props.steps}
                stepCurrent={this.state.step}
                stepFinal={this.props.stepFinal}
                failure={this.state.failure}
                resultMessage={this.state.failure ? this.props.resultMessageFail :
                  this.props.resultMessageSuccess}
                retry={this.handleRetry} />
              <form className="contact-form" onSubmit={this.handleSubmit}>
                {contactElement}
                <ContactNav
                  stepCurrent={this.state.step}
                  stepFinal={this.props.stepFinal}
                  onPrevious={this.handlePrevious}
                  nav={this.props.navigation} />
              </form>
            </div>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  },
  shouldComponentUpdate: function (nextProps) {
    return nextProps.name === 'contact';
  },
  onChange: function () {
    this.setState(this.getStateFromStore());
  },
  saveFields: function (fields) {
    this.executeAction(contactAction, {
      fields: fields,
      complete: (this.state.step === (this.props.stepFinal - 1))
    });
  },
  getStateFromStore: function () {
    var store = this.getStore(ContactStore);
    return {
      fields: store.getContactFields(),
      failure: store.getContactFailure()
    };
  },
  nextStep: function () {
    this.setState({
      step: this.state.step + 1,
      direction: 'next'
    });
  },
  prevStep: function (done) {
    this.setState({
      step: this.state.step - 1,
      direction: 'prev'
    }, done);
  },
  handleRetry: function () {
    this.prevStep(function () {
      this.saveFields(this.state.fields);
      this.nextStep();
    });
  },
  handleSubmit: function (event) {
    event.preventDefault();
    var step = this.props.steps[this.state.step];

    var fieldValue = React.findDOMNode(this.inputElement).value.trim();
    if (!fieldValue) {
      return;
    }

    var fields = this.state.fields;
    fields[step.name] = fieldValue;

    this.saveFields(fields);
    this.nextStep();
  },
  handlePrevious: function (event) {
    event.preventDefault();
    this.prevStep();
  }
});

module.exports = Contact;
