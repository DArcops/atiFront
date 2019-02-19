
angular.module('app', [])
  .controller('SignUp',  function($scope, $http, $window) {
    console.log("in SignUp controller");

    if(localStorage.getItem("token") !== null)
      $window.location.href = "/dashboard"

    $scope.submit = function(){
      if($scope.pass !== $scope.confirm_pass){
        console.log("los passwords no coinciden")
        $scope.pass = "";
        $scope.confirm_pass = "";
        return
      }

      var url = "http://localhost:8088/api/v1/users/login"
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
