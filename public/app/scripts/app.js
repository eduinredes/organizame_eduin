'use strict';

angular
    .module('organizameApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/document_form/:id?', {
                templateUrl: 'app/views/document.html',
                controller: 'DocumentCtrl',
                controllerAs: 'docu'
            })
            .when('/documents', {
                templateUrl: 'app/views/documentCrud.html',
                controller: 'DocumentCrudCtrl',
                controllerAs: 'documentsCrud'
            })
            .when('/login', {
                templateUrl: 'app/views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

angular.module('organizameApp').run(['$rootScope', '$location', 'userServ', function ($rootScope, $location, userServ) {
    $rootScope.bodylogin = "padding-top: 40px;  padding-bottom: 40px; background-color: #eee;"
    var path = function() { return $location.path();};
    $rootScope.$watch(path, function(newVal, oldVal){
        $rootScope.activetab = newVal;
    });

    $rootScope.$on('$routeChangeStart', function (event) {
        
        if (!userServ.isLogged()) {
           console.log('DENY');
            //event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            //$location.path('/main');
        }
    });
    
}]);

/*directiva para controlar el menu*/
angular.module('organizameApp').directive('navbarDirective', navbarDirective);
navbarCtrl.$inject = ["userServ",'$scope','$location','$rootScope'];
function navbarDirective() {
 return {
            controller: navbarCtrl,
    templateUrl: 'app/views/menu.html'
  };
}

function navbarCtrl(userServ,$scope,$location,$rootScope) {
    /*Cerrar sesión*/
    $scope.logout = function( ) {
        userServ.logout();
        $scope.isAuthenticated = false;
        
        $location.path('login');
      
    }

    $rootScope.$on('$routeChangeStart', function (event) {
        $scope.isAuthenticated = isAuthenticated();
        
    });
              
    //Indica si el usuario esta logueado
    function isAuthenticated( ) {
      return userServ.isLogged();
    }

    $scope.isAuthenticated = isAuthenticated();
}