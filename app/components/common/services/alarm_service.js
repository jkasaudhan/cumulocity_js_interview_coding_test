(function() {
    'use strict';
    
     angular.module('app.common.services')
            .factory('AlarmService', AlarmService);

            AlarmService.$inject = ['$http', 'Config'];

            /*
            We can use .service() method as well but I prefer using .factory() method because use can us return object with functions or values which should be publically available and hide private variables or function, this //is also considered among best practices because of modular patter. We don't have return any object using //.service() method but .service() method uses .factory() method internally to create the services. 
            */
            function AlarmService($http, Config) {
                console.log('Alarm  service called.');
                var alarmService = {};

                alarmService.getAlarmData = function(successCB, errorCB) {
                        var req = {
                             method: 'GET',
                             url: Config.BASE_URL + '/alarm/alarms?pageSize=2000&resolved=false',
                             data: {}
                        }

                       $http(req).then(function(res) {
                           console.log("Response after get alarm data: ",res);
                           if(res.status === 200) {
                               //It means successfully got data using api
                               successCB(res.data);
                           } else {
                             errorCB(res);  
                           }
                        }, function(err) {
                            errorCB(err);  
                        }); 
                      }

                  return alarmService;
                };
      
})();