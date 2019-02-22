
angular.module('app', [])
  .controller('SignUp',  function($scope, $http, $window) {
    var baseUrl = "https://44b90368.ngrok.io";
    console.log("in SignUp controller");

    if(localStorage.getItem("token") !== null)
      $window.location.href = "/dashboard"

    $scope.submit = function(){
      if($scope.pass !== $scope.confirm_pass){
        $scope.pass = "";
        $scope.confirm_pass = "";
        return
      }

      var url = baseUrl+"/api/v1/users/register"
      var data = {
        "username": $scope.name,
        "email" : $scope.email,
        "pass" : $scope.pass,
      }
      console.log(data);
      var config = {};

      $http.post(url, data, config)
              .success(function (data, status, headers, config) {
                console.log(data)
                $window.location.href = "/"
              })
              .error(function (data, status, header, config) {
                console.log(status)
              });
    }

  });
