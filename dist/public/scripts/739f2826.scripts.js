"use strict";angular.module("lifterlyApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch"]).config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){a.when("/",{templateUrl:"partials/lifts",controller:"LiftsCtrl",authenticate:!0}).when("/login",{templateUrl:"partials/login",controller:"LoginCtrl"}).when("/lifts",{templateUrl:"partials/lifts",controller:"LiftsCtrl",authenticate:!0}).when("/signup",{templateUrl:"partials/signup",controller:"SignupCtrl"}).when("/settings",{templateUrl:"partials/settings",controller:"SettingsCtrl",authenticate:!0}).when("/about",{templateUrl:"partials/about"}),b.html5Mode(!0),c.interceptors.push(["$q","$location",function(a,b){return{responseError:function(c){return 401===c.status||403===c.status?(b.path("/login"),a.reject(c)):a.reject(c)}}}])}]).run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$routeChangeStart",function(a,d){d.authenticate&&!c.isLoggedIn()&&b.path("/login")})}]),angular.module("lifterlyApp").controller("MainCtrl",function(){}),angular.module("lifterlyApp").controller("NavbarCtrl",["$scope","$location","Auth",function(a,b,c){a.menu=[{title:"Home",link:"/"},{title:"Settings",link:"/settings"}],a.logout=function(){c.logout().then(function(){b.path("/login")})},a.isActive=function(a){return a===b.path()}}]),angular.module("lifterlyApp").controller("LoginCtrl",["$scope","Auth","$location","$window",function(a,b,c,d){a.user={},a.errors={},a.login=function(e,f){a.submitted=!0,f?d.location.href="/api/auth/"+f:e.$valid&&b.login({email:a.user.email,password:a.user.password}).then(function(){c.path("/")}).catch(function(b){b=b.data,a.errors.other=b.message})}}]),angular.module("lifterlyApp").controller("SignupCtrl",["$scope","Auth","$location",function(a,b,c){a.user={},a.errors={},a.register=function(d){a.submitted=!0,d.$valid&&b.createUser({name:a.user.name,email:a.user.email,password:a.user.password}).then(function(){c.path("/")}).catch(function(b){b=b.data,a.errors={},angular.forEach(b.errors,function(b,c){d[c].$setValidity("mongoose",!1),a.errors[c]=b.type})})}}]),angular.module("lifterlyApp").controller("LiftsCtrl",["$scope","Auth","User","Workout",function(a,b,c,d){a.user=b.currentUser(),a.formLifts=[{}],a.workoutIdx=0,a.prevWorkout=function(){0!==a.workoutIdx&&a.workoutIdx--},a.nextWorkout=function(){a.workoutIdx!==a.user.workouts.length&&a.workoutIdx++},a.hasMain=function(a){if(!a)return!1;for(var b=!1,c=0;c<a.length;c++)a[c].main&&(b=!0);return b},a.hasAcc=function(a){if(!a)return!1;for(var b=!1,c=0;c<a.length;c++)a[c].main||(b=!0);return b},a.saveLifts=function(){d.save({id:a.user._id,lifts:a.formLifts},function(){a.user=b.currentUser(),a.formLifts=[{}]})},a.addLift=function(){a.formLifts.push({})}}]),angular.module("lifterlyApp").controller("SettingsCtrl",["$scope","User","Auth","$window",function(a,b,c,d){a.errors={},a.user=b.get(),a.evernoteConnect=function(){d.location="/api/users/evernoteConnect"},a.changePassword=function(b){a.submitted=!0,b.$valid&&c.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){a.message="Password successfully changed."}).catch(function(){b.password.$setValidity("mongoose",!1),a.errors.other="Incorrect password"})}}]),angular.module("lifterlyApp").factory("Auth",["$location","$rootScope","Session","User","$cookieStore",function(a,b,c,d,e){return b.currentUser=e.get("user")||null,e.remove("user"),{login:function(a,d){var e=d||angular.noop;return c.save({email:a.email,password:a.password},function(a){return b.currentUser=a,e()},function(a){return e(a)}).$promise},logout:function(a){var d=a||angular.noop;return c.delete(function(){return b.currentUser=null,d()},function(a){return d(a)}).$promise},createUser:function(a,c){var e=c||angular.noop;return d.save(a,function(a){return b.currentUser=a,e(a)},function(a){return e(a)}).$promise},changePassword:function(a,b,c){var e=c||angular.noop;return d.update({oldPassword:a,newPassword:b},function(a){return e(a)},function(a){return e(a)}).$promise},currentUser:function(){return d.get()},isLoggedIn:function(){var a=b.currentUser;return!!a}}}]),angular.module("lifterlyApp").factory("Session",["$resource",function(a){return a("/api/session/")}]),angular.module("lifterlyApp").factory("User",["$resource",function(a){return a("/api/users/:id/:action",{id:"@id"},{update:{method:"PUT",params:{}},get:{method:"GET",params:{id:"me"}}})}]),angular.module("lifterlyApp").factory("Workout",["$resource",function(a){return a("/api/users/:id/workout",{id:"@id"})}]),angular.module("lifterlyApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}});