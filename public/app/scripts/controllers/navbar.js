'use strict';

angular
.module('organizameApp')
.controller('NavbarController', ['$scope', 'userServ', '$location', function($scope,
     userServ, $location) {

    /*Cerrar sesión*/
    $scope.logout = function( ) {
      userServ.logout(function(){
        $scope.isAuthenticated = false;
        
        $location.path('login');
      });
    }
 
    
              
    //Indica si el usuario esta logueado
    function isAuthenticated( ) {
      return userServ.isLogged();
    }

    $scope.isAuthenticated = isAuthenticated();
}]);