'use strict';

var React = require('react'),
    LastLift = require('components/LastLift'),
    LiftDisplay = require('components/LiftDisplay'),
    LiftEntry = require('components/LiftEntry'),
    styles = require('Lifterly.less'),
    debug = require('debug')('Lifterly.jsx');

var Lifterly = React.createClass({

    render: function(){
        return (
            <div>
                <LiftDisplay/>
                <LiftEntry/>
            </div>
        );

    }

});


module.exports = Lifterly;

