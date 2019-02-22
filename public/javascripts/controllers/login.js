
angular.module('app', [])
  .controller('Login',  function($scope, $http, $window) {
    var baseUrl = "https://9b96d449.ngrok.io";
    console.log("in login controller");

    if(localStorage.getItem("token") !== null)
      $window.location.href = "/dashboard"

    $scope.submit = function(){
      var url = baseUrl+"/api/v1/users/login"
      var data = {
        "email" : $scope.email,
        "pass" : $scope.pass,
      }
      console.log(data);
      var config = {};

      $http.post(url, data, config)
              .success(function (data, status, headers, config) {
                console.log(data)

                localStorage.setItem("token",data.token)
                localStorage.setItem("user_name",data.user_name)
                localStorage.setItem("user_email",data.user_email)
                $window.location.href = "/dashboard"
              })
              .error(function (data, status, header, config) {
                console.log(status)
              });
    }

  });
