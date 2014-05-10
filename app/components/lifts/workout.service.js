'use strict';

angular.module('lifterly.lifts')
    .factory('Workout', function($resource) {
        return $resource('/api/users/:id/workout', {
            id: '@id'
        });
    });
