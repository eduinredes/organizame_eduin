'use strict';

/**
 * 
 */
angular.module('organizameApp')
  .service('userServ',["$q",'$http', function ($q,$http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var defered;
    var isLoggedIn = false;
    return {
      login: login,
      isLogged : isLogged,
      logout : logout
    };
    
    //////////////////////////////
    
    
    function login(data){
      defered = $q.defer();
      var promise = defered.promise;

      //$http.post(apiEndpoints.getEndpoint("api_post_advertiser"),data).then(fthen, fcatch);

      
        $http({
            url: '/api/login',
            method: 'POST',
            data: data // Make sure to inject the service you choose to the controller
           
        }).then(fthen, fcatch);
      return promise;
    }

    function logout(){
      isLoggedIn = false;
    }

    function isLogged(){
      return isLoggedIn;
    }

   

    function fthen(response) {
      if(response.data.code == 200){
        isLoggedIn = true;
      }else{
       isLoggedIn = false; 
      }
      defered.resolve(response.data);

    }

    function fcatch(err) {
      alert(err.data.message)
      defered.reject(err);
    }
    
  }]);
