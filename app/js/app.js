/** @jsx React.DOM */

var React = require('react');
var $ = require('zepto');
window.React = React;

var CreateAccountForm = React.createClass({
	onStateChange: function(){
		this.props.changeFormState('LOGIN');
		console.log($);
	},
	render: function(){
		return (
			<div>
				<EmailInput />
				<PasswordInput />
				<PasswordRepeatInput />
				<button>Create Account</button>
				<button 
					className="btn-link" 
					onClick={this.onStateChange}>
					Cancel
				</button>
			</div>
		);
	}
}); 

var EmailInput = React.createClass({
	render: function(){
		return (
			<div className="form-control">
				<label htmlFor="loginEmail">Email
					<input name="email" id="loginEmail" type="email" />
				</label>
			</div>
		);
	}
});

var PasswordInput = React.createClass({
	render: function(){
		return (
			<div className="form-control">
				<label htmlFor="loginPassword">Password
					<input name="password" id="loginPassword" type="password" />
				</label>
			</div>
		);
	}
});

var PasswordRepeatInput = React.createClass({
	render: function(){
		return (
			<div className="form-control">
				<label htmlFor="loginPasswordRepeat">Password Repeat
					<input name="passwordRepeat" id="loginPasswordRepeat" type="password" />
				</label>
			</div>
		);
	}
});

var LoginForm = React.createClass({
	onStateChange: function(){
		this.props.changeFormState('CREATE_ACCOUNT');
	},
	login: function(){

	},	
	render: function(){
		return (
			<div>
				<EmailInput />
				<PasswordInput />
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
		);
	}
});

var Login = React.createClass({
	getInitialState: function(){
		return {
			view: 'LOGIN'
		};
	},
	changeFormState: function(view){
		this.setState({
			view: view
		});
	},
	render: function(){
		var form;

		switch (this.state.view) {
			case 'LOGIN': 
				form = <LoginForm 
						changeFormState={this.changeFormState}
					/>;
				break;
			case 'CREATE_ACCOUNT':
				form = <CreateAccountForm 
						changeFormState={this.changeFormState}
					/>;
				break;
			default:
				form = <div></div>;
		}

		return (
			<div>
				{form}
			</div>
		);
	}
});

React.renderComponent(<Login />, document.body);