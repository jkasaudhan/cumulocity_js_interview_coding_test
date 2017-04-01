(function() {
    'use strict';
    
    angular.module('app.common.controllers')
    .controller('AppController', AppController);
    
    AppController.$inject = ['$scope'];
    
    function AppController($scope) {
        console.log("Global app controller called.");        
        //Format date time
        $scope.formateDatetime = function(datetime) {

          if(datetime !== '' && datetime !== null) {
            //returned this 30-Apr-2016 15:08 but should be converted to 2016-04-29 15:17
            var d1 = new Date(datetime);
            var d2 = d1.getFullYear() +'-'+ d1.getMonth() +'-'+ d1.getDate() +' '+ d1.getHours() +':'+ d1.getMinutes();
            return d2;
          }
          else {
              return "";
          }
      }
    }
})();