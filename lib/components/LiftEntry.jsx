'use strict';

var React = require('react'),
    Parse = require('parse').Parse,
    ParseReact = require('parse-react'),
    debug = require('debug')('LiftEntry.jsx');

var LiftEntry = React.createClass({
    mixins: [ParseReact.Mixin],

    observe: function(){
        return {
            liftTypes: (new Parse.Query('LiftTypes'))
        }
    },

    render: function(){

        var options = this.data.liftTypes.map(
            liftType => <option key={liftType.id}>{liftType.Name}</option>
        );

        return (
            <form className="pure-form pure-form-stacked">
                <fieldset>

                    <label>Lift</label>
                    <select>
                        {options}
                    </select>

                    <label>Sets</label>
                    <input type="number"/>

                    <label>Reps</label>
                    <input type="number"/>

                </fieldset>
            </form>
        );

    }

});


module.exports = LiftEntry;

