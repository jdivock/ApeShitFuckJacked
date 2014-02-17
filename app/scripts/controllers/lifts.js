'use strict';

angular.module('lifterlyApp')
    .controller('LiftsCtrl', function($scope, Auth, User, Workout) {
        $scope.user = Auth.currentUser();

        $scope.formLifts = [{
            main: true
        }];

        console.log("user", $scope.user);

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

        $scope.addLift = function(isMain) {
            $scope.formLifts.push({
                main: isMain
            });

        };

    });
