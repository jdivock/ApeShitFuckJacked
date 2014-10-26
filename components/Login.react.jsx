/** @jsx React.DOM */
'use strict';

var React = require('react');
var AuthActions = require('../actions/AuthActions');
var formUtils = require('../util/formUtils');


var EmailInput = React.createClass({
	setEmail: function(){
		this.props.onUserInput({
			email: this.refs.loginEmail.getDOMNode().value
		});
	},
	render: function(){
		return (
			<div className="form-control">
				<label htmlFor="loginEmail">Email
					<input 
						name="email" 
						id="loginEmail" 
						type="email" 
						ref="loginEmail" 
						value={this.props.email} 
						onChange={this.setEmail}
					/>
				</label>
			</div>
		);
	}
});

var PasswordInput = React.createClass({
	setPassword: function(){
		this.props.onUserInput({
			password: this.refs.loginPassword.getDOMNode().value
		});
	},
	render: function(){
		return (
			<div className="form-control">
				<label htmlFor="loginPassword">Password
					<input 
						name="password" 
						ref="loginPassword" 
						id="loginPassword" 
						type="password" 
						value={this.props.password}
						onChange={this.setPassword}
					/>
				</label>
			</div>
		);
	}
});

var PasswordRepeatInput = React.createClass({
	setPassword: function(){
		this.props.onUserInput({
			passwordRepeat: this.refs.passwordRepeat.getDOMNode().value
		});
	},
	render: function(){
		return (
			<div className="form-control">
				<label htmlFor="loginPasswordRepeat">Password Repeat
					<input 
						name="passwordRepeat" 
						ref="passwordRepeat" 
						id="loginPasswordRepeat" 
						type="password" 
						onChange={this.setPassword}
					/>
				</label>
			</div>
		);
	}
});

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
				form = <div className="login-greeting">
							Hello {this.props.user.name}. 
							<button 
								className="pure-button" 
								onClick={this.logout}>
								Logout
							</button>
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
