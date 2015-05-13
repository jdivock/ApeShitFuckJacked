'use strict';

var React = require('react/addons'),
    Parse = require('parse').Parse,
    ParseReact = require('parse-react'),
    debug = require('debug')('LiftEntry.jsx');

var LiftEntry = React.createClass({
    mixins: [ParseReact.Mixin, React.addons.LinkedStateMixin],

    getInitialState: function(){
        return {};
    },

    observe: function(){
        return {
            liftTypes: (new Parse.Query('LiftTypes'))
        }
    },

    addLift: function(e){
        e.preventDefault();

        ParseReact.Mutation.Create('LiftEntries', {
            LiftType: this.state.liftType,
            Sets: +this.state.sets,
            Reps: +this.state.reps,
            weight: +this.state.weight,
            unit: 'lb',
            date: new Date()
        }).dispatch();

        this.replaceState({});
    },

    render: function(){

        var options = this.data.liftTypes.map(
            liftType => <option value={liftType.Name}
                                key={liftType.id}>{liftType.Name}</option>
        );

        return (
            <div className="lift-entry">
                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>New Entry</legend>

                        <label>Lift</label>
                        <select valueLink={this.linkState('liftType')}>
                            <option value=""></option>
                            {options}
                        </select>

                        <label>Weight</label>
                        <input type="number"
                               valueLink={this.linkState('weight')}/>

                        <label>Sets</label>
                        <input type="number"
                               valueLink={this.linkState('sets')}/>

                        <label>Reps</label>
                        <input type="number"
                               valueLink={this.linkState('reps')}/>

                        <button type="submit"
                                className="pure-button
                                           pure-button-primary"
                                onClick={this.addLift}>
                            Submit
                        </button>
                    </fieldset>
                </form>
            </div>
        );

    }

});


module.exports = LiftEntry;

