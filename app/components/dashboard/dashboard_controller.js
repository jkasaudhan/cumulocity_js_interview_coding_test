(function() {
    'use strict';

       angular.module('app.dashboard')
              .controller('DashboardController', DashboardController)
              .filter('sortBySeverity', sortBySeverity);

                DashboardController.$inject = ['$scope', '$http', 'AlarmService', '$exceptionHandler'];

                function DashboardController($scope, $http, AlarmService, $exceptionHandler) {
                    console.log("Dashboard  controller called.");
                    AlarmService.getAlarmData(function(data) {
                        console.log('Alarm data from server: ', data);
                        $scope.alarmData = data.alarms;
                    }, 
                    function(err) {
                        $exceptionHandler(err);
                    });    

                    //Specify default value of filters. By default display items in descending order based on //created datetime    
                    $scope.severityOptions = {
                        availableOptions: [
                          {id: '1', name: 'CRITICAL'},
                          {id: '2', name: 'MAJOR'},
                          {id: '3', name: 'MINOR'},
                          {id: '3', name: 'WARNING'}
                        ],
                        selectedOption: {id: '1', name: 'CRITICAL'} //This sets the default value of the select in the ui
                        };
                    
                    $scope.alarmFilter = {
                        mostRecent: '-creationTime',
                        mostSevere: ''
                    };    
                    
                    $scope.mostRecentFlag = true;
                    $scope.mostSevereFlag = false;
                    
                    $scope.changeFilter = function() {
                        console.log("change  filter",$scope.mostRecentFlag, $scope.mostSevereFlag);
                        $scope.alarmFilter.mostRecent = ($scope.mostRecentFlag) ? '-creationTime': 'creationTime';
                        
                        $scope.alarmFilter.mostSevere = ($scope.mostSevereFlag)? sortBySeverity: '';
                       
                    }
//                    $scope.changeRecentFilter = function(mostRecentFlag) {
//                        $scope.mostRecentFlag = !mostRecentFlag;
//                        console.log("change recent filter",$scope.mostRecentFlag);
//                    }
//                    
//                    $scope.changeSeverityFilter = function(mostSevereFlag) {
//                        $scope.mostSevereFlag = !mostSevereFlag;
//                        console.log("change severe filter",$scope.mostSevereFlag);
//                    }
                }
    
        //Create filter to sort data by severity level
        function sortBySeverity() {
           
             return function(items, label) {
                 //console.log("severity filter: ", items, label);
                 var soredItems = [];
                //Define severity an integer value so that we can sort an array based on severity.
                 var severitLevel = {
                    'CRITICAL': 1,
                    'MAJOR': 2,
                    'MINOR': 3,
                    'WARNING': 4
                 };
                 
                 if(items) {
                     for(var i = 0; i < items.length; i++ ) {
                         var curItem = items[i];
                         if(curItem.severity === label) {
                             soredItems.push(curItem);
                         }
                                  
                     }
                 }

                 return soredItems;
             };
        }
})(); 
 
