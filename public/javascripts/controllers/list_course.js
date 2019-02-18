
var app = angular.module('app', [])
  app.controller('List_Courses',  function($scope, $http, $window) {

    console.log("listando...")
    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      var config = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
      };

      $http.get("http://localhost:8088/api/v1/users/profile",config)
      .then(function(response) {
        $scope.administrator = response.data.administrator;
      });

      $http.get("http://localhost:8088/api/v1/courses/",config)
        .then(function(response) {
          $scope.courses = response.data;
          console.log(response.data);
      });

      $scope.suscribe = function(pass,course_id){
        console.log(pass)
        console.log(course_id);

        var data = {
          "course_id": course_id,
          "user_pass" : pass,
        };

        $http.post("http://localhost:8088/api/v1/courses/suscribe", data, config)
                .success(function (data, status, headers, config) {
                  console.log("Ya se suscribio")
                  $scope.pasale = ""
                  swal({
                    type: 'success',
                    title: 'Te has inscrito correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  $window.location.href = "/courses/"+course_id+"/lessons";
                })
                .error(function (data, status, header, config) {
                  console.log("mal",status);
                  if(parseInt(status) == parseInt(409)){
                    swal({
                      type: 'warning',
                      title: 'Parece que ya estas inscrito :/',
                      showConfirmButton: false,
                      timer: 2500
                    })
                  }else {
                    swal({
                      type: 'error',
                      title: 'Hubo un problema',
                      timer: 1500
                    })
                  }
                });
      }

      $scope.createCourse = function(){
        $window.location.href = "/new_course";
      }

      $scope.update = function(course) {
        $window.location.href = "/course/update/"+course
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
