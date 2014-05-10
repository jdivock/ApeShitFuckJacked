'use strict';

angular.module('lifterly')
    .factory('Session', function($resource) {
        return $resource('/api/session/');
    });
