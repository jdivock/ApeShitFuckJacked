'use strict';

angular.module('lifterlyApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $window) {
    $scope.errors = {};

    $scope.user = User.get();

    $scope.evernoteConnect = function(){
      $window.location = '/api/users/evernoteConnect';
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;



      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};
  });
