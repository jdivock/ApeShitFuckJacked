/** @jsx React.DOM */
'use strict';

var React = require('react');

var ApeShitFuckJackedApp = require('./components/ApeShitFuckJackedApp.react');

window.React = React;


/*jshint ignore:start */
React.renderComponent(
	<ApeShitFuckJackedApp />, 
	document.body);
/*jshint ignore:end */