/** @jsx React.DOM */

'use strict';

var React = window.React = require('react'),
	Context = require('./lib/Context'),
	AuthStore = require('./stores/AuthStore'),
	ApeShitFuckJackedApp = require('./components/ApeShitFuckJackedApp.react');

require('../styles/main.scss');

Context.registerStore(AuthStore);

var context = new Context({});


React.renderComponent(
	<ApeShitFuckJackedApp context={context.getComponentContext()}/>, 
	document.body);