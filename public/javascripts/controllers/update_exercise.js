
var app = angular.module('app', [])
  app.controller('Update_Exercise',  function($scope, $http, $window) {

    var location = $window.location.pathname

    var slash = [];
    for(var i= 0; i < location.length; i++)
      if(location[i] == "/")
        slash.push(i);

    var lesson_id = location.substring(slash[3]+1,slash[4]);

    var config = {
      headers: {
          'Authorization': localStorage.getItem("token")
      }
    };

    var location = $window.location.pathname;
    var exercise_id = location.substring(location.length-1,location.length)

    $http.get("http://localhost:8088/api/v1/exercises/"+exercise_id+"?lesson_id="+lesson_id+"&to_update=true",config)
      .then(function(response) {
        $scope.exercise_name = response.data.name;
        $scope.dataInput = response.data.input;
        $scope.dataOutput = response.data.output;
        $('#summernote').summernote('code',response.data.code);
        console.log(response.data);
    });

    $scope.submit = function(){
      console.log("que pedou")
      var url = "http://localhost:8088/api/v1/exercises/update/"+exercise_id

      var data = {
        "name" : $scope.exercise_name,
        "course_id" : parseInt(2),
        "level_id": parseInt(2),
        "lesson_id": parseInt(2),
        "input": $scope.dataInput,
        "output": $scope.dataOutput,
        "code": $('#summernote').summernote('code')
      }
      $http.post(url, data, config)
              .success(function (data, status, headers, config) {
                swal({
                  type: 'success',
                  title: 'Actualizacion correcta',
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
