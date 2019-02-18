var app = angular.module('app', [])
  app.controller('List_Exercies',  function($scope, $http, $window,$timeout) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      /////////////////GET ID's ////////////////////////
      var location = $window.location.pathname;

      var course_id = "";
      for(var i = 9; ; i++)
        if(location[i] == "/") break;
        else course_id += location[i];
      ///////////////////////////////////////////////////

      $('#summernote').summernote({
        focus: true                  // set focus to editable area after initializing summernote
      });

      console.log("si sirve x 2 ")
      var config = {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      };

      $http.get("http://localhost:8088/api/v1/users/profile",config)
      .then(function(response) {
        $scope.administrator = response.data.administrator;
      });

      $scope.addExercise = function() {
        $window.location.href="/new_exercise"
      }

      var location = $window.location.pathname;
      var lastSlash = location.lastIndexOf("/")
      var lesson_id = location.substring(lastSlash+1,location.length)
      var lesson;

      $http.get("http://localhost:8088/api/v1/lessons/"+lesson_id,config)
      .then(function(response) {
        lesson = response.data;
        $('#summernote').summernote('code',lesson.code);
        $('#summernote').summernote('destroy');
      });

      $http.get("http://localhost:8088/api/v1/exercises?course_id="+course_id+"&lesson_id="+lesson_id,config)
      .then(function(response) {
        $scope.exercises = response.data;
      });

      $scope.selectExercise = function(exercise_id) {
        $window.location.href = "/courses/"+course_id+"/lessons/"+lesson_id+"/exercises/"+exercise_id;
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
