/** @jsx React.DOM */

var React = require('react');
window.React = React;

console.log('stuff');

var Login = React.createClass({
	render: function(){
		return (
			<div>
				Hello Der again
			</div>
		);
	}
});

React.renderComponent(<Login />, document.body);