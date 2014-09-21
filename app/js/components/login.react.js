/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('zepto');

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
			password: '',
			status: ''
		};
	},
	handleUserInput: function(newInput){
		this.setState(newInput);
	},
	login: function(){
		$.ajax({
			type: 'POST',
			url: '/api/session',
			data: {
				email: this.state.email,
				password: this.state.password
			},
			success: function(data){
				//TODO: Display welcome state?
				this.props.changeFormState({view: 'WELCOME'});
			}.bind(this),
			error: function(xhr, type){
			    console.error('Login failed');
			    this.setState({
			    	status: 'Login Failed'
			    });
			}.bind(this)
		});
	},
	render: function(){
		var status;


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

var Login = React.createClass({
	getInitialState: function(){
		return {
			view: 'LOGIN'
		};
	},
	changeFormState: function(state){
		this.setState(state);
	},
	render: function(){
		var form;

		switch (this.state.view) {
			case 'LOGIN': 
				/*jshint ignore:start */
				form = <LoginForm 
						changeFormState={this.changeFormState}
						email={this.state.email}
					/>;
				/*jshint ignore:end */
				break;
			case 'CREATE_ACCOUNT':
				/*jshint ignore:start */
				form = <CreateAccountForm 
						changeFormState={this.changeFormState}
						email={this.state.email}
					/>;
				/*jshint ignore:end */
				break;
			default:
				/*jshint ignore:start */
				form = <div>Hello.</div>;
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
