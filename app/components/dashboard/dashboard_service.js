(function() {
    'use strict';
    
     angular.module('app.dashboard')
            .factory('DashboardService', DashboardService);

            DashboardService.$inject = ['$http', 'Config'];

            /*
            We can use .service() method as well but I prefer using .factory() method because use can us return object with functions or values which should be publically available and hide private variables or function, this //is also considered among best practices because of modular patter. We don't have return any object using //.service() method but .service() method uses .factory() method internally to create the services. 
            */
            function DashboardService($http, Config) {
                console.log('Dashboard service called.');
            }

      
})();