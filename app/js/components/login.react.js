/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('zepto');
var AuthStore = require('../stores/AuthStore');
var AuthActions = require('../actions/AuthActions');

var validateEmail = function(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   	return re.test(email);
};

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
	createAccount: function(){
		if(this.state.password !== this.state.passwordRepeat){
			this.setState({
				status: 'Passwords Do not Match'
			});
		} else if ( !validateEmail(this.state.email) ){
			this.setState({
				status: 'Invalid Email Address'
			});
		} else {
			
			$.ajax({
				type: 'POST',
				url: '/api/users',
				data: {
					email: this.state.email,
					password: this.state.password
				},
				success: function(data){
					this.props.changeFormState({view: 'WELCOME'});
				}.bind(this),
				error: function(xhr, type){
				    console.error('Create Account failed');
				    this.setState({
				    	status: 'Create Account Failed'
				    });
				}.bind(this)
			});
		}
	},
	render: function(){
		return (
			/*jshint ignore:start */
			<div>
				<span>{this.state.status}</span>
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
					type="submit"
					onClick={this.createAccount}>
					Create Account
				</button>
				<button 
					className="btn-link" 
					onClick={this.onStateChange}>
					Cancel
				</button>
			</div>
			/*jshint ignore:end */
		);
	}
}); 

var EmailInput = React.createClass({
	setEmail: function(){
		this.props.onUserInput({
			email: this.refs.loginEmail.getDOMNode().value
		});
	},
	render: function(){
		return (
			/*jshint ignore:start */
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
			/*jshint ignore:end */
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
			/*jshint ignore:start */
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
			/*jshint ignore:end */
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
			/*jshint ignore:start */
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
			/*jshint ignore:end */
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
	login: function(){
		AuthActions.login(this.state.email, this.state.password);
	},
	render: function(){

		return (
			/*jshint ignore:start */
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
					type="submit"
					onClick={this.login}>
					Submit
				</button>
				<button 
					className="btn-link" 
					onClick={this.onStateChange}>
					Create Account
				</button>
			</div>
			/*jshint ignore:end */
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

function getCurrentView(){
	return {
		view: AuthStore.isLoggedIn() ? 'DEFAULT' : 'LOGIN'
	};
}

var Login = React.createClass({

	getInitialState: function(){
		return getCurrentView();
	},
	componentDidMount: function() {
		AuthStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AuthStore.removeChangeListener(this._onChange);
	},
	changeFormState: function(state){
		this.setState(state);
	},
	_onChange: function() {
	    this.setState(getCurrentView());
	},
	render: function(){
		var form;

		switch (this.state.view) {
			case 'LOGIN': 
				/*jshint ignore:start */
				form = <LoginForm 
						changeFormState={this.changeFormState}
						email={this.state.email}
						error={this.state.error}
					/>;
				/*jshint ignore:end */
				break;
			case 'CREATE_ACCOUNT':
				/*jshint ignore:start */
				form = <CreateAccountForm 
						changeFormState={this.changeFormState}
						email={this.state.email}
						error={this.state.error}
					/>;
				/*jshint ignore:end */
				break;
			default:
				/*jshint ignore:start */
				form = <div>Hello {this.state.email}.</div>;
				/*jshint ignore:end */
		}

		return (
			/*jshint ignore:start */
			<div>
				{form}
			</div>
			/*jshint ignore:end */
		);
	}
});

module.exports = Login;
