'use strict';

/**
 * 
 */
angular.module('organizameApp')
    .controller('LoginCtrl', ["userServ", "$scope", "$route", "$location", function (userServ, $scope, $route, $location) {
        $scope.$route = $route;
        var login = this;
        
        login.formCheck;
        login.form = {};
        login.submitLogin = submitLogin;

        function submitLogin() {
            if (login.formCheck.$valid) {
                var resp = userServ.login(login.form);
                resp.then(function (data) {
                   

                    $location.path('main');
                    // Materialize.toast($("#mess_done").text(), 5000);
                }).catch(function (err) {
                    //Materialize.toast($("#mess_error").text(), 5000);
                });
            }

        }
    }]);
