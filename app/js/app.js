/** @jsx React.DOM */
'use strict';

var React = window.React = require('react');

var ApeShitFuckJackedApp = require('./components/ApeShitFuckJackedApp.react');
var AuthAPIUtil = require('./utils/AuthAPIUtils');

AuthAPIUtil.getUser();

/*jshint ignore:start */
React.renderComponent(
	<ApeShitFuckJackedApp />, 
	document.body);
/*jshint ignore:end */