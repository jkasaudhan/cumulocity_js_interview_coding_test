(function() {
    'use strict';

    angular.module('app.dashboard')
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/dashboard', {
        templateUrl: '../components/dashboard/dashboard.html',
        controller: 'DashboardController'
      });
    }]);
})();