
var app = angular.module('app', [])
  app.controller('Devices',  function($scope, $http, $window) {
    console.log("in Devices controller");
    var baseUrl = "http://localhost:8088/api/v1"
    var config = {};
    var provider_id = $window.location.href.split("/")[4]


    loadDevices = function() {
      $http.get(baseUrl+"/providers/"+provider_id+"/devices",config)
        .then(function(response) {
          $scope.devices = response.data;
          console.log("RESPUESTA DE DEVICES", $scope.providers)
      });
    }

    $scope.saveDevice = function() {
      var data = {
        "provider_id": parseInt(provider_id),
        "imei": $scope.imei.toString(),
        "mpn": $scope.mpn,
        "mpn": $scope.name,
        "ubication": $scope.ubication,
        "admission_date": $scope.admission_date,
      }
      console.log("add provider data", data)
      $http.post(baseUrl+"/providers/"+provider_id+"/devices", data, config)
               .success(function (data, status, headers, config) {
                 swal({
                   type: 'success',
                   title: 'Device Created',
                   showConfirmButton: false,
                   timer: 1500
                 })
                 loadDevices();

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

    loadDevices();

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
