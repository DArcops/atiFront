
var app = angular.module('app', [])
  app.controller('Profile',  function($scope, $http, $window) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      var config = {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      };

      $http.get("http://localhost:8088/api/v1/users/profile",config)
      .then(function(response) {
        $scope.user = response.data;
      });

      $scope.addAdminUser = function(){
        var url = "http://localhost:8088/api/v1/users/addAdmin"
        var data = {
          "email": $scope.emailNewAdmin,
        }
        $http.post(url, data, config)
                .success(function (data, status, headers, config) {
                  swal({
                    type: 'success',
                    title: 'Usuario Agregado',
                    showConfirmButton: false,
                    timer: 1500
                  })
                })
                .error(function (data, status, header, config) {
                  swal({
                    type: 'error',
                    title: 'Hubo un problema',
                    timer: 1500
                  })
                });
      }
})

////////////////////CONTROLLER FOR LAYOUT/////////////////////

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
