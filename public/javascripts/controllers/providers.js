
var app = angular.module('app', [])
  app.controller('Providers',  function($scope, $http, $window) {
    console.log("in Providers controller");
    var baseUrl = "http://localhost:8088/api/v1"
    var config = {};

    setVariables = function() {
      $scope.showModal = false;
      $scope.name = "";
      $scope.email = "";
      $scope.phone = "";
      $scope.contactName = "";

    }

    if(localStorage.getItem("token") === null)
      $window.location.href = "/"

    $scope.activeModal = function() {
      $scope.showModal=true;
    }

    $scope.hideModal = function() {
      setVariables()
    }

    $scope.viewProvider = function(providerID) {
      console.log("PROVIDER CLICKED", providerID)
    }

    loadProviders = function() {
      $http.get("http://localhost:8088/api/v1/providers",config)
        .then(function(response) {
          $scope.providers = response.data;
          console.log("RESPUESTA DE PROVIDERS", $scope.providers)
      });
    }

    setVariables();
    loadProviders();

    $scope.saveProvider = function() {
      $scope.showModal=false;
      var url = baseUrl+"/providers"

      var data = {
        "name": $scope.name,
        "email": $scope.email,
        "phone": $scope.phone,
        "contact_name": $scope.contactName,
      }
      console.log("add provider data", data)
      $http.post(url, data, config)
               .success(function (data, status, headers, config) {
                 swal({
                   type: 'success',
                   title: 'Provider Created',
                   showConfirmButton: false,
                   timer: 1500
                 })
                 setVariables()
                 loadProviders();
               })
               .error(function (data, status, header, config) {
                 swal({
                   type: 'warning',
                   title: 'An error ocurred',
                   showConfirmButton: false,
                   timer: 2500
                 })
               });
    }

    // $scope.submit = function(){
    //   if($scope.pass !== $scope.confirm_pass){
    //     $scope.pass = "";
    //     $scope.confirm_pass = "";
    //     return
    //   }
    //
    //   var url = "http://localhost:8088/api/v1/users/register"
    //   var data = {
    //     "email" : $scope.email,
    //     "pass" : $scope.pass,
    //   }
    //   console.log(data);
    //   var config = {};
    //
    //   $http.post(url, data, config)
    //           .success(function (data, status, headers, config) {
    //             console.log(data)
    //             $window.location.href = "/"
    //           })
    //           .error(function (data, status, header, config) {
    //             console.log(status)
    //           });
    // }

  });




    app.controller('layout', function($scope, $http, $window) {
      if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      $scope.logout = function(){
      localStorage.clear();
      $window.location.href = '/login'
      }
      });

  app.controller('layout_user', function($scope, $http, $window) {
        $scope.userName = localStorage.getItem("user_name");
        $scope.userEmail = localStorage.getItem("user_email");
    });
