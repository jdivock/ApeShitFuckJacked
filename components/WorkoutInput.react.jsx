/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react'),
	_ = require('lodash');

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
			return (
				<option key={'lift-type-' + idx}>
					{lift}
				</option>);
			/*jshint ignore:end */
		});

		return (
			/*jshint ignore:start */
			<select 
				className="lift-select" 
				ref="liftTypeOption" 
				value={this.props.value}
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
					value={this.props.value}
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
					value={this.props.value}
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
					value={this.props.value}
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
				<LiftSelect 
					idx={this.props.key} 
					updateLiftInput={this.updateLiftInput}
					value={this.props.lift.name}
				/>
				<WeightInput 
					idx={this.props.key} 
					updateLiftInput={this.updateLiftInput}
					value={this.props.lift.weight}
				/>
				<SetInput 
					idx={this.props.key} 
					updateLiftInput={this.updateLiftInput}
					value={this.props.lift.sets}
				/>
 				<RepInput 
 					idx={this.props.key} 
 					updateLiftInput={this.updateLiftInput}
 					value={this.props.lift.reps}
 				/>
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
	this.id = 'l_id_' + Date.now();
}

function generateCleanWorkoutState(){
	var timestamp = Date.now();
	var lifts = {};
	var lift = new Lift();
	lifts[lift.id] = lift;

	return {
		id: 'w_id_' + timestamp,
		date: new Date().toDateInputValue(),	
		lifts : lifts,
		comments: null
	};
}

// Take array of lifts given to us and transform it into an object
// we can do key lookups off of
function transformLifts(lifts){
	return _.reduce(lifts, function(accum, lift){
		accum[lift.id] = lift;

		return accum;
	}, {});
}

 var WorkoutInput = React.createClass({
 	// Load in existing lifts, other create one blank one
 	// to get started
 	getInitialState: function(){
 		if(this.props.type === 'CREATE'){
 			return generateCleanWorkoutState();
 		} else {
 			var lifts = transformLifts(this.props.workout.lifts);
 			var formattedDate = new Date(this.props.workout.date).toDateInputValue();
 			return React.addons.update(this.props.workout, {date: {$set: formattedDate}, lifts: {$set: lifts}});
 		}
 		
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
 	cancel: function(e){
 		e.preventDefault();

 		this.props.cancel();

 		this.setState(generateCleanWorkoutState());
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

 		// Flatten this shit out -- NEW ONLY?
 		var lifts = _.map(this.state.lifts, function(lift){
 			return lift;
 		});

 		var workout = this.state;

 		// Flattening out the bonkers stuff I do on new save
 		workout.lifts = lifts;

 	// 	this.props.submitWorkout({
		// 	date: this.state.date,
		// 	lifts: lifts,
		// 	comments: this.state.comments
		// });

		this.props.submitWorkout({workout: workout});

		this.setState(generateCleanWorkoutState());
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
	 						onClick={this.cancel}>
	 						Cancel
	 					</button>
 					</div>
 				</fieldset>
 			</form>
 			/*jshint ignore:end */
 		);
 	}
 });

 module.exports = WorkoutInput;
