'use strict';

angular.module('lifterlyApp')
    .factory('Workout', function($resource) {
        return $resource('/api/users/:id/workout', {
            id: '@id'
        });
    });
