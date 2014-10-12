/** @jsx React.DOM */

'use strict';

var React = window.React = require('react'),
	Context = require('./lib/Context'),
	AuthStore = require('./stores/AuthStore');

var ApeShitFuckJackedApp = require('./components/ApeShitFuckJackedApp.react');
var AuthAPIUtil = require('./utils/AuthAPIUtils');

Context.registerStore(AuthStore);

var context = new Context({});


React.renderComponent(
	<ApeShitFuckJackedApp context={context.getComponentContext()}/>, 
	document.body);