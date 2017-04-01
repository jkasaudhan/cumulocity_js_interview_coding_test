'use strict';

// Declare app level module which depends on views, and components

angular.module('alarm-dashboar-app', [
  'ngRoute',
  'app.common.controllers',
  'app.common.services',
  'app.dashboard'
]).constant('Config', {
    BASE_URL: 'https://demos.cumulocity.com'
}).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]).config(function($httpProvider) {
        	
            var AuthTokenInjectorService = function() {
                var authTokenInjector = {
                   request: function(config){
            
                   /*
                   Set auth token for api.   
                   Actual auth token is 'Basic ZWthdGVyaW5hOkthdGUwMTIzNA==', but the api returns the data successfully, even with the wrong authtoken 'Basic ZWthdGVyaW5hOkthdGUwMTIzNA==falsetoken'
                   */
                   config.headers['Authorization'] = 'Basic ZWthdGVyaW5hOkthdGUwMTIzNA==';
                  
                   return config;
                  },
                  responseError: function(res) {
                	  console.error("Error: Failed to connect with api: ", res);
                	  return res;
                  }
                }
                return authTokenInjector;
             }

            $httpProvider.interceptors.push(AuthTokenInjectorService);
            
    }).factory('$exceptionHandler', function() {
        console.log('%cGlobal exception handler called.', 'font-size: 15px; background-color: yellow; border: 5px solid red;');
        return function(exception, cause) {
            //Upon exception, either we can redirect to an appropriate page or we can send exception to sentry //to keep track of bugs or errors
        console.error(exception);
    }
});
