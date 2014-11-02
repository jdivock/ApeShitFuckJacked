/** @jsx React.DOM */
'use strict';

var React = require('react');

var PasswordRepeatInput = React.createClass({
	setPassword: function(){
		this.props.onUserInput({
			passwordRepeat: this.refs.passwordRepeat.getDOMNode().value
		});
	},
	render: function(){
		return (
			<div className="pure-control-group">
				<label htmlFor="loginPasswordRepeat">Password Repeat</label>
				<input 
					name="passwordRepeat" 
					ref="passwordRepeat" 
					id="loginPasswordRepeat" 
					type="password" 
					onChange={this.setPassword}
				/>
			</div>
		);
	}
});

module.exports = PasswordRepeatInput;