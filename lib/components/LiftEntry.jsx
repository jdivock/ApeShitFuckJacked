'use strict';

var React = require('react'),
    Parse = require('parse').Parse,
    ParseReact = require('parse-react'),
    debug = require('debug')('Lifterly.jsx');

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
            <section>
                <div>
                    <label>Lift</label>
                    <select>
                        {options}
                    </select>
                </div>

                <div>
                    <label>Sets</label>
                    <input type="number"/>
                </div>

                <div>
                    <label>Reps</label>
                    <input type="number"/>
                </div>
            </section>
        );

        }

});


module.exports = LiftEntry;

