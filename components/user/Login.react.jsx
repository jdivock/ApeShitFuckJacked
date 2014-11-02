/** @jsx React.DOM */
'use strict';

var React = require('react'),
	AuthActions = require('../../actions/AuthActions'),
	formUtils = require('../../util/formUtils'),
	EmailInput = require('./EmailInput.react'),
	PasswordInput = require('./PasswordInput.react'),
	PasswordRepeatInput = require('./PasswordRepeatInput.react'),
	NavLink = require('flux-router-component').NavLink;


var CreateAccountForm = React.createClass({
	onStateChange: function(){
		this.props.changeFormState({view: 'LOGIN'});
	},
	getInitialState: function(){
		return {
			email: '',
			password: '',
			passwordRepeat: '',
			status: ''
		};
	},
	handleUserInput: function(newInput){
		this.setState(newInput);
	},
	createAccount: function(e){
		e.preventDefault();
		if(this.state.password !== this.state.passwordRepeat){
			this.setState({
				status: 'Passwords Do not Match'
			});
		} else if ( !formUtils.validateEmail(this.state.email) ){
			this.setState({
				status: 'Invalid Email Address'
			});
		} else {	
			this.props.context.executeAction(AuthActions.create, {
				email: this.state.email, 
				password: this.state.password
			});
		}
	},
	render: function(){
		var error = this.props.error || this.state.status;

		return (
			<fieldset>
				<span>{error}</span>
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
				<button 
					className="pure-button"
					type="submit"
					onClick={this.createAccount}>
					Create Account
				</button>
				<button 
					className="btn-link pure-button" 
					onClick={this.onStateChange}>
					Cancel
				</button>
			</fieldset>
		);
	}
}); 

var LoginForm = React.createClass({
	onStateChange: function(){
		this.props.changeFormState({view: 'CREATE_ACCOUNT'});
	},
	getInitialState: function(){

		return {
			email: '',
			password: ''
		};
	},
	handleUserInput: function(newInput){
		this.setState(newInput);
	},
	login: function(e){
		e.preventDefault();
		this.props.context.executeAction(AuthActions.login, {
			email: this.state.email,
			password: this.state.password
		});
	},
	render: function(){

		return (
			<fieldset>
			<div>
				<span>{this.props.error}</span>
				<EmailInput 
					email={this.state.email}
					onUserInput={this.handleUserInput}
				/>
				<PasswordInput 
					password={this.state.password}
					onUserInput={this.handleUserInput}
				/>
				<button 
					className="pure-button pure-button-primary"
					onClick={this.login}>
					Submit
				</button>
				<button 
					className="pure-button" 
					onClick={this.onStateChange}>
					Create Account
				</button>
			</div>
			</fieldset>
		);
	}
});



/**
 * Still figuring this one out, right now the form can toggle it's state
 * by moving back and forth from login to create. Do I want the AuthStore
 * as well coming in and changing state? Seems like multiple sources
 * of change which is what this whole architecture is trying to stop
 * in the first place
 */

// function getCurrentView(){

// 	return {
// 		view: AuthStore.isLoggedIn() ? 'DEFAULT' : 'LOGIN',
// 		error: AuthStore.getError(),
// 		user: AuthStore.getUser()
// 	};
// }

var Login = React.createClass({

	/* 
	 * Keeping email in here to hold between login/create forms
	 */
	getInitialState: function(){
		return {
			view: 'LOGIN',
			email: null,
			error: null
		};
	},
	
	changeFormState: function(state){
		this.setState(state);
	},
	logout: function(e){
		e.preventDefault();
		this.props.context.executeAction(AuthActions.logout);
	},
	render: function(){
		var view = this.props.user.loggedIn ? 'DEFAULT' : this.state.view;
		var form;

		switch (view) {
			case 'LOGIN': 
				form = <LoginForm 
						changeFormState={this.changeFormState}
						email={this.state.email}
						error={this.state.error}
						context={this.props.context}
					/>;
				break;
			case 'CREATE_ACCOUNT':
				form = <CreateAccountForm 
						changeFormState={this.changeFormState}
						email={this.state.email}
						error={this.state.error}
						context={this.props.context}
					/>;
				break;
			default:
				form = <div className="login-greeting pure-menu pure-menu-horizontal pure-menu-open">
							<ul>
								<li>
									<NavLink 
										className="logo" 
										name="home"
										context={this.props.context}>
										ApeShitFuckJacked
									</NavLink>
								</li>
								<li>
									Hello {this.props.user.firstName + ' ' + this.props.user.lastName}. 
								</li>
								<li>
									<button 
										className="pure-button" 
										onClick={this.logout}>
										Logout
									</button>
								</li>
								<li>
									<NavLink 
										name="profile"
										context={this.props.context}>
										Edit Profile
									</NavLink>
								</li>
							</ul>
						</div>;
		}

		return (
			<form className="login-form pure-form pure-form-stacked">
				<div className="container">
					{form}
				</div>
			</form>
		);
	}
});

module.exports = Login;
