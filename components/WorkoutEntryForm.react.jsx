/**
 * @jsx React.DOM
 */

 'use strict';

var React = require('react/addons'),
	_ = require('lodash'),
	AuthStore = require('../stores/AuthStore'),
	AuthActions = require('../actions/AuthActions');

/* 
 * TODO: Configure lifts form user's profile or config
 */
var liftTypes = [
	'Squat',
	'Press',
	'Bench Press',
	'Deadlift',
	'Pullups',
	'Dips',
	'Good Mornings',
	'RDLs'
];

var LiftSelect = React.createClass({
	getInitialState: function(){
		return {};
	},
	changeLiftType: function(){
		this.props.updateLiftInput('name', this.refs.liftTypeOption.getDOMNode().value);
	},
	render: function() {

		var liftOptions = liftTypes.map(function(lift, idx){
			/*jshint ignore:start */
			return <option key={'lift-type-' + idx} value={lift}>{lift}</option>;
			/*jshint ignore:end */
		});

		return (
			/*jshint ignore:start */
			<select 
				className="lift-select" 
				ref="liftTypeOption" 
				onChange={this.changeLiftType}
			>
				{liftOptions}
			</select>
			/*jshint ignore:end */
		);
	}
});

var RepInput = React.createClass({
	changeReps: function(){
		this.props.updateLiftInput('reps', this.refs.reps.getDOMNode().value);
	},
	render: function() {
		return (
			/*jshint ignore:start */
			<div className="form-control">
				<label className="rep-input" htmlFor={'rep-input' + this.props.idx}>Reps</label>
				<input 
					type="number" 
					ref="reps" 
					id={'rep-input' + this.props.idx} 
					onChange={this.changeReps}
				/>
			</div>
			/*jshint ignore:end */
		);
	}
});

var SetInput = React.createClass({
	changeSets: function(){
		this.props.updateLiftInput('sets', this.refs.sets.getDOMNode().value);
	},
	render: function() {
		return (
			/*jshint ignore:start */
			<div className="form-control">
				<label className="set-input" htmlFor={'set-input' + this.props.idx}>Sets</label>
				<input 
					type="number" 
					ref="sets" 
					id={'set-input' + this.props.idx} 
					onChange={this.changeSets}
				/>
			</div>
			/*jshint ignore:end */
		);
	}
});

var WeightInput = React.createClass({
	changeWeight: function(){
		this.props.updateLiftInput('weight', this.refs.weight.getDOMNode().value);
	},
	render: function() {
		return (
			/*jshint ignore:start */
			<div className="form-control">
				<label className="weight-input" htmlFor={'weight-input' + this.props.idx}>Weight</label>
				<input 
					type="number" 
					ref="weight" 
					id={'weight-input' + this.props.idx} 
					onChange={this.changeWeight}
				/>
			</div>
			/*jshint ignore:end */
		);
	}
});


var LiftInput = React.createClass({
	updateLiftInput: function(key, value){
		var keyObj = {};
		keyObj[key] = value;
		var newLift = React.addons.update(this.props.lift, {$merge: keyObj});

		var liftObj = {};
		liftObj[this.props.key] = newLift;


		this.props.updateLift(liftObj);
	},
	render: function() {
		return (
			/*jshint ignore:start */
			<div className="lift-input">
				<LiftSelect idx={this.props.key} updateLiftInput={this.updateLiftInput}/>
				<WeightInput idx={this.props.key} updateLiftInput={this.updateLiftInput}/>
 				<RepInput idx={this.props.key} updateLiftInput={this.updateLiftInput}/>
 				<SetInput idx={this.props.key} updateLiftInput={this.updateLiftInput}/>
			</div>
			/*jshint ignore:end */
		);
	}
});

/** 
 * Lift object since I'll be creating these as the users
 * generates more forms on the fly
 *
 * Defaulting name to 0 index lift type (squat);
 *
 * Also pretty sure I can just build this here since bundler puts this all in an IIFE
 */
function Lift(){
	this.name = liftTypes[0];
	this.sets = 0;
	this.reps = 0;
	this.weight = 0;
	this.comments = null;
}

function generateCleanWorkoutState(){
	var timestamp = Date.now();
	var lifts = {};
	lifts[timestamp] = new Lift();

	return {
		date: new Date().toDateInputValue(),	
		lifts : lifts,
		comments: null
	};
}

 var WorkoutInput = React.createClass({
 	getInitialState: function(){
 		return generateCleanWorkoutState();
 	},
 	addLift: function(e){
 		e.preventDefault();
 		var timestamp = Date.now();

 		var liftContainer = {};
 		liftContainer[timestamp] = new Lift();

 		this.setState({
 			lifts: React.addons.update( this.state.lifts, {$merge: liftContainer})
 		});
 	},
 	clearFormState: function(e){
 		e.preventDefault();
 		this.props.setFormState('INITIAL');
 	},
 	setDate: function(){
 		this.setState({
 			date: this.refs.workoutDate.getDOMNode().value
 		});
 	},
 	setComments: function(){
 		this.setState({
 			comments: this.refs.comments.getDOMNode().value
 		});
 	},
 	submitWorkout: function(e){
 		e.preventDefault();

 		// Flatten this shit out
 		var lifts = _.map(this.state.lifts, function(lift){
 			return lift;
 		});

 		// Firing workout save action
		this.props.context.executeAction(AuthActions.saveWorkout, {
			date: this.state.date,
			lifts: lifts,
			comments: this.state.comments
		});

		this.setState(generateCleanWorkoutState());
		this.props.setFormState('INITIAL');
 	},
 	/*
 	 * TODO: Oof, there has to be a better way here, I fixed the 
 	 * pre-existing condition before, but it's a real pain in the add
 	 * floating immutables up the change and I have to do a lot of 
 	 * weird object manipulation to make it work
 	 *
 	 */
 	updateLift: function(lift){
 		this.setState({
 			lifts: React.addons.update(this.state.lifts, {$merge: lift})
 		});
 	},
 	render: function() {
		var liftInputs = _.map(this.state.lifts, function(lift, idx){
 			/*jshint ignore:start */
 			return <LiftInput 
 					key={idx} 
 					lift={lift}
 					updateLift={this.updateLift}/>
 			/*jshint ignore:end */
 		}.bind(this));

 		return (
 			/*jshint ignore:start */
 			<form className="workout-input pure-form pure-form-stacked">

 				<fieldset>
 					<input type="date" value={this.state.date} ref="workoutDate" onChange={this.setDate}/>

 					<div className="lift-inputs">
 						{liftInputs}
 					</div>

 					<label>Comments:</label>
 					<textarea
 						value={this.state.comments}
 						ref="comments"
 						onChange={this.setComments}
 					>
 					</textarea>

 					<div className="form-controls">
	 					<button className="pure-button pure-button-primary"
	 						onClick={this.submitWorkout}>
	 						Submit
	 					</button>
	 					<button className="pure-button pure-button-secondary"
	 						onClick={this.addLift}>
	 						Add Lift
	 					</button>
	 					<button className="pure-button"
	 						onClick={this.clearFormState}>
	 						Cancel
	 					</button>
 					</div>
 				</fieldset>
 			</form>
 			/*jshint ignore:end */
 		);
 	}
 });

 var WorkoutEntryForm = React.createClass({
 	getInitialState: function(){
 		return {
 			view: 'INITIAL'
 		};
 	},
 	setFormState: function(state){
 		this.setState({
 			view: state 
 		});
 	},
 	setFormStateAdd: function(){
 		this.setState({
 			view: 'FORM'
 		});
 	},
 	render: function() {
 		var form,
 			formView;

 		if(!this.props.user.loggedIn){
 			formView = null;
 		} else {
 			formView = this.state.view;
 		}

 		switch (formView) {
 			case 'FORM':
 				/*jshint ignore:start */
 				form = <WorkoutInput 
 						setFormState={this.setFormState}
 						context={this.props.context}
 						/>;
 				/*jshint ignore:end */
 				break;
 			case 'INITIAL':
 				/*jshint ignore:start */
 				form = <button 
 						className="pure-button pure-button-primary" 
 						onClick={this.setFormStateAdd}>
 						Add Workout
 						</button>;
 				/*jshint ignore:end */
 				break;

 			default:
 				form = '';
 		}

 		return (
 			/*jshint ignore:start */
 			<div className="lift-entry-form">
 				{form}
 			</div>
 			/*jshint ignore:end */
 		);
 	}
 });

 module.exports = WorkoutEntryForm;