'use strict';

angular.module('lifterlyApp')
    .controller('LiftsCtrl', function($scope, Auth, User, Workout) {
        $scope.user = Auth.currentUser();

        $scope.formLifts = [{

        }];

        $scope.workoutIdx = 0;

        $scope.prevWorkout = function() {
            if( $scope.workoutIdx === 0){
                return;
            }
            $scope.workoutIdx--;
        };

        $scope.nextWorkout = function() {
            if( $scope.workoutIdx === $scope.user.workouts.length){
                return;
            }
            $scope.workoutIdx++;
        };


        $scope.hasMain = function(liftArr) {
            if (!liftArr) {
                return false;
            }
            var hasMain = false;

            for (var i = 0; i < liftArr.length; i++) {
                if (liftArr[i].main) {
                    hasMain = true;
                }
            }
            return hasMain;
        };

        //TODO combine this with hasMain
        $scope.hasAcc = function(liftArr) {
            if (!liftArr) {
                return false;
            }
            var hasAcc = false;

            for (var i = 0; i < liftArr.length; i++) {
                if (!liftArr[i].main) {
                    hasAcc = true;
                }
            }
            return hasAcc;
        };

        $scope.saveLifts = function(form) {
            Workout.save({
                id: $scope.user._id,
                lifts: $scope.formLifts
            }, function() {
                // Load new lifts by reloading user profile
                $scope.user = Auth.currentUser();

                // Reset form
                $scope.formLifts = [{}];
            });
        };

        $scope.addLift = function() {
            $scope.formLifts.push({

            });

        };

    });
