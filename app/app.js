'use strict';

angular.module('lifterly', [
    'lifterly.navbar',
    'lifterly.lifts',
    'lifterly.profile',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngTouch'
])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'components/lifts/lifts.html',
                controller: 'LiftsCtrl',
                authenticate: true
            })
            .when('/login', {
                templateUrl: 'components/profile/login/login.html',
                controller: 'LoginCtrl'
            })
            .when('/lifts', {
                templateUrl: 'components/lifts/lifts.html',
                controller: 'LiftsCtrl',
                authenticate: true
            })
            .when('/signup', {
                templateUrl: 'components/profile/signup/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/settings', {
                templateUrl: 'components/profile/settings/settings.html',
                controller: 'SettingsCtrl',
                authenticate: true
            })
            .when('/about', {
                templateUrl: 'components/about/about.html'
            });
            // .otherwise({
            //     redirectTo: '/'
            // });

        $locationProvider.html5Mode(true);

        // Intercept 401s and 403s and redirect you to login
        $httpProvider.interceptors.push(['$q', '$location',
            function($q, $location) {
                return {
                    'responseError': function(response) {
                        if (response.status === 401 || response.status === 403) {
                            $location.path('/login');
                            return $q.reject(response);
                        } else {
                            return $q.reject(response);
                        }
                    }
                };
            }
        ]);
    })
    .run(function($rootScope, $location, Auth) {

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function(event, next) {

            console.log(event, next);

            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            } else if(next.templateUrl === 'components/profile/login/login.html' && Auth.isLoggedIn()){
                $location.path('/');
            }
        });
    });
