'use strict';

angular.module('lifterlyApp')
    .factory('User', function($resource) {
        return $resource('/api/users/:id/:action', {
            id: '@id'
        }, { //parameters default
            update: {
                method: 'PUT',
                params: {}
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            }
        });
    });
