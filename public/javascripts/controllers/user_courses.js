
var app = angular.module('app', [])
  app.controller('User_Courses',  function($scope, $http, $window) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      var config = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
      };

      $http.get("http://localhost:8088/api/v1/users/courses",config)
        .then(function(response) {
          $scope.courses = response.data;
          console.log(response.data);
      });

      $scope.continue = function(course_id) {
        $window.location.href = "/courses/"+course_id+"/lessons";
      }

  });

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
