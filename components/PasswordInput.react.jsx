/** @jsx React.DOM */
'use strict';

var React = require('react');

var PasswordInput = React.createClass({
	setPassword: function(){
		this.props.onUserInput({
			password: this.refs.loginPassword.getDOMNode().value
		});
	},
	render: function(){
		return (
			<div className="pure-control-group">
				<label htmlFor="loginPassword">Password</label>
				<input 
					name="password" 
					ref="loginPassword" 
					id="loginPassword" 
					type="password" 
					value={this.props.password}
					onChange={this.setPassword}
				/>
			</div>
		);
	}
});


module.exports = PasswordInput;