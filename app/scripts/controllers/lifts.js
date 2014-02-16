'use strict';

angular.module('lifterlyApp')
    .controller('LiftsCtrl', function($scope, Auth, User, Workout) {
        $scope.user = Auth.currentUser();

        $scope.formLifts = [{}];

        $scope.saveLifts = function(form) {
            console.log($scope.formLifts);
            Workout.save({
                id: $scope.user._id,
                lifts: $scope.formLifts
            }, function() {
                $scope.user = Auth.currentUser();
            });
        };

        $scope.addLift = function() {
            $scope.formLifts.push({});
        };

    });
