
var app = angular.module('app', [])
  app.controller('Providers',  function($scope, $http, $window) {
    console.log("in Providers controller");
    var baseUrl = "https://b8867e98.ngrok.io"+"/api/v1"
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
      $http.get(baseUrl+"/providers",config)
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
