'use strict';

angular.module('lifterlyApp')
    .factory('Session', function($resource) {
        return $resource('/api/session/');
    });
