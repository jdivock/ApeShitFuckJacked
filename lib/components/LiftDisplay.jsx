'use strict';

var React = require('react'),
    Parse = require('parse').Parse,
    ParseReact = require('parse-react'),
    moment = require('moment'),
    debug = require('debug')('LiftDisplay.jsx');

var LiftDisplay = React.createClass({

    mixins: [ParseReact.Mixin],

    observe: function(){
        return {
            liftEntries: (new Parse.Query('LiftEntries'))
        }


        /* return {
           liftEntries: (new Parse.Query('LiftEntries').ascending('weight'))
           } */

        /* return {
           liftEntries: (new Parse.Query('LiftEntries').ascending('weight'))
           } */

        /* return {
           liftEntries: (new Parse.Query('LiftEntries').equalTo('LiftType', 'Squat'))
           } */
    },
    render: function(){
        debug('lifts', this.data);


        var liftRows = this.data.liftEntries.map(
            liftEntry => (
                <tr>
                    <td>{liftEntry.LiftType}</td>
                    <td>{liftEntry.weight} {liftEntry.unit}</td>
                    <td>{liftEntry.Sets}</td>
                    <td>{liftEntry.Reps}</td>
                    <td>{moment(liftEntry.date).format('l')}</td>
                </tr>
                )
        );

        var liftTable = (
            <table className="pure-table">
                <thead>
                    <tr>
                        <td>Lift</td>
                        <td>Weight</td>
                        <td>Sets</td>
                        <td>Reps</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {liftRows}
                </tbody>
            </table>
        );

        return (
            <section className="lift-display">
                <h3>Lift Query</h3>
                {liftTable}
            </section>
            );

        }

});


module.exports = LiftDisplay;
