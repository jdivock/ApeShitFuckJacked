'use strict';

var React = require('react'),
    LastLift = require('components/LastLift'),
    LiftEntry = require('components/LiftEntry'),
    debug = require('debug')('Lifterly.jsx');

var Lifterly = React.createClass({

    render: function(){
        return (
            <div>
            <LastLift/>
            <LiftEntry/>
            </div>
            );

        }

});


module.exports = Lifterly;

