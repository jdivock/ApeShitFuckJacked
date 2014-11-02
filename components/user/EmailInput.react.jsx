/** @jsx React.DOM */
'use strict';

var React = require('react');

var EmailInput = React.createClass({
	setEmail: function(){
		this.props.onUserInput({
			email: this.refs.loginEmail.getDOMNode().value
		});
	},
	render: function(){
		return (
			<div className="pure-control-group">
				<label htmlFor="loginEmail">Email</label>
				<input 
					name="email" 
					id="loginEmail" 
					type="email" 
					ref="loginEmail" 
					value={this.props.email} 
					onChange={this.setEmail}
				/>
			</div>
		);
	}
});

module.exports = EmailInput;