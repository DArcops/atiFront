var app = angular.module('app', [])

  .controller('New_Exercise',  function($scope, $http, $window) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

    console.log("IN NEW EXER");

    $('#summernote').summernote({
      height: 730,                 // set editor height
      minHeight: null,             // set minimum height of editor
      maxHeight: null,             // set maximum height of editor
      focus: true                  // set focus to editable area after initializing summernote
    });


    var config = {
      headers: {
          'Authorization': localStorage.getItem("token")
      }
    };

    $http.get("http://localhost:8088/api/v1/courses/",config)
      .then(function(response) {
        $scope.courses = response.data;
        console.log(response.data);
    });
    //
    $scope.change = function() {
      $http.get("http://localhost:8088/api/v1/levels?course_id="+$scope.selectedCourse,config)
        .then(function(response) {
          $scope.levels = response.data;
          console.log(response.data);
      });
    };

    $scope.changeLevel = function() {
      $http.get("http://localhost:8088/api/v1/lessons?level_id="+$scope.selected_level+"&course_id="+$scope.selectedCourse,config)
        .then(function(res) {
          $scope.lecciones = res.data;
          console.log(res.data);
      });
    };
    //

    $scope.submit = function(){
      console.log("kakakakakaaka");
       var url = "http://localhost:8088/api/v1/exercises/new"
      var data = {
        "name" : $scope.exercise_name,
        "course_id" : parseInt($scope.selectedCourse),
        "level_id": parseInt($scope.selected_level),
        "lesson_id": parseInt($scope.leccionSeleccionada),
        "input": $scope.dataInput,
        "output": $scope.dataOutput,
        "code": $('#summernote').summernote('code')
      }
      console.log(data);

      var config = {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      };

      $http.post(url, data, config)
              .success(function (data, status, headers, config) {
                console.log("EJERCICIO CREADO")
                swal({
                  type: 'success',
                  title: 'Ejercicio Creado',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
              .error(function (data, status, header, config) {
                console.log("UBO ERROR")
                swal({
                  type: 'error',
                  title: 'Hubo un problema',
                  timer: 1500
                })
              });
    }


  });

  ///////////////////CONTROLLER FOR LAYOUT/////////////////////

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
