/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react'),
	Login = require('./user/Login.react');

var TopNav = React.createClass({

	render: function(){
		return (
			<Login 
				user={this.props.user} 
				context={this.props.context}
			/>
		);

	}
});

module.exports = TopNav;