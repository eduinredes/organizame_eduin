'use strict';

/**
 * 
 */
angular.module('organizameApp')
  .service('documentServ',["$q",'$http', function ($q,$http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var defered;
    return {
      getAll: getAll,
      update: update,
      create: create,
      delete : deleteDoc,
      getById : getById

    };
    
    //////////////////////////////
    
    
    function create(data){
      defered = $q.defer();
      var promise = defered.promise;

      //$http.post(apiEndpoints.getEndpoint("api_post_advertiser"),data).then(fthen, fcatch);

        $http({
            url: "/api/document",
            method: 'POST',
            data: data, // Make sure to inject the service you choose to the controller
           
        }).then(fthen, fcatch);
      return promise;
    }

    function update(id,data){
      defered = $q.defer();
      var promise = defered.promise;

      //$http.post(apiEndpoints.getEndpoint("api_post_advertiser"),data).then(fthen, fcatch);
        $http({
            url: "/api/document/"+id,
            method: 'POST',
            data: data // Make sure to inject the service you choose to the controller
         
        }).then(fthen, fcatch);
      return promise;
    }

    function deleteDoc(id){
        defered = $q.defer();
        var promise = defered.promise;
  
        //$http.post(apiEndpoints.getEndpoint("api_post_advertiser"),data).then(fthen, fcatch);
          $http({
              url: "/api/document/"+id,
              method: 'DELETE'
            
          }).then(fthen, fcatch);
        return promise;
      }

    function getAll(){
      defered = $q.defer();
      var promise = defered.promise;

      $http.get("/api/document").then(fthen, fcatch);

      return promise;
    }

    function getById(id){
      defered = $q.defer();
      var promise = defered.promise;

      //$http.post(apiEndpoints.getEndpoint("api_post_advertiser"),data).then(fthen, fcatch);

        $http({
            url: "/api/document/"+id,
            method: 'GET'
        }).then(fthen, fcatch);
      return promise;
    }
    
    function fthen(response) {
      defered.resolve(response.data);

    }

    function fcatch(err) {
      defered.reject(err);
    }
    
  }]);
