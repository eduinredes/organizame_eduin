'use strict';

/**
 * 
 */
angular.module('organizameApp')
    .controller('DocumentCtrl', ['$routeParams', "$scope", "$location", "documentServ", function ($routeParams, $scope, $location, documentServ) {
        var id = $routeParams.id;

        var docu = this;
        docu.formFail = false;
        docu.detalles = []

        docu.formCheck = {}
        docu.form = { detalles: [{}] }

        docu.addLinea = addLinea;
        docu.submitForm = submitForm;
        ////////////////////////////////

        if (id) {
            var response = documentServ.getById(id);
            response.then(function (data) {

                docu.form = data[0];


            }).catch(function (err) {
                docu.formFail = true;
            });
        }

        ////////////////////

        function submitForm(event) {
            event.stopPropagation();
            event.preventDefault();
            if (docu.formCheck.$valid) {
                var resp;
                if (id) {
                    resp = documentServ.update(id, docu.form)
                } else {
                    resp = documentServ.create(docu.form)
                }

                resp.then(function (data) {
                    id = data.id;

                    $location.path('documents');
                    if (data.code != 200) {
                        docu.formFail = true;
                    }


                }).catch(function (err) {
                    docu.formFail = true;

                });
            }
        }

        function addLinea() {
            if (docu.form.detalles == undefined) {
                docu.form.detalles = []
            }
            docu.form.detalles.push({})
        }



    }]);
