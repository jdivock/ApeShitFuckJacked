/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react'),
	EmailInput = require('./user/EmailInput.react'),
	AuthActions = require('../actions/AuthActions'),
	PasswordInput = require('./user/PasswordInput.react'),
	PasswordRepeatInput = require('./user/PasswordRepeatInput.react'),
	_ = require('lodash');

var FirstName = React.createClass({
	setName: function(){
		this.props.onUserInput({
			firstName: this.refs.firstName.getDOMNode().value
		});
	},
	render: function(){
		return (
			<div className="pure-control-group">
				<label htmlFor="firstName">First Name</label>
				<input 
					name="firstName" 
					id="firstName" 
					type="text" 
					ref="firstName" 
					value={this.props.name} 
					onChange={this.setName}
				/>
			</div>
		);
	}
});


var LastName = React.createClass({
	setName: function(){
		this.props.onUserInput({
			lastName: this.refs.lastName.getDOMNode().value
		});
	},
	render: function(){
		return (
			<div className="pure-control-group">
				<label htmlFor="lastName">Last Name</label>
				<input 
					name="lastName" 
					id="lastName" 
					type="text" 
					ref="lastName" 
					value={this.props.name} 
					onChange={this.setName}
				/>
			</div>
		);
	}
});



var Profile = React.createClass({
	getInitialState: function(){
		return this.props.user;
	},
	handleUserInput: function(newInput){
		this.setState(newInput);
	},
	updateProfile: function(e){
		e.preventDefault();

		var user = this.state;

		delete user.loggedIn;
		delete user.workouts;

		this.props.context.executeAction(AuthActions.update, {
			user: user
		});
	},
	render: function(){
		return (
			<form className="pure-form profile-form pure-form-aligned">
				<fieldset>
					<legend>Profile</legend>
					<FirstName 
						name={this.state.firstName}
						onUserInput={this.handleUserInput}
					/>
					<LastName 
						name={this.state.lastName}
						onUserInput={this.handleUserInput}
					/>
					<EmailInput 
						email={this.state.email}
						onUserInput={this.handleUserInput}
					/>
					<PasswordInput 
						password={this.state.password}
						onUserInput={this.handleUserInput}
					/>
					<PasswordRepeatInput 
						onUserInput={this.handleUserInput}
					/>

					<div className="pure-controls">
						<button 
							type="submit" 
							className="pure-button pure-button-primary"
							onClick={this.updateProfile}>
							Submit
						</button>
					</div>

				</fieldset>
			</form>
		);
	}
});

module.exports = Profile;