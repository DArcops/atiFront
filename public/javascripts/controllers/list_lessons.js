var app = angular.module('app', [])
  app.controller('List_Lessons',  function($scope, $http, $window,$timeout) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      console.log("si sirve")
      var config = {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      };

      $http.get("http://localhost:8088/api/v1/users/profile",config)
      .then(function(response) {
        $scope.administrator = response.data.administrator;
      });


      var location = $window.location.pathname;
      var lastSlash = location.lastIndexOf("/")
      var course_id = "";
      for(var i = 9; ; i++)
        if(location[i] == "/") break;
        else course_id += location[i];


      $http.get("http://localhost:8088/api/v1/levels?course_id="+course_id,config)
      .then(function(response) {
        $scope.levels = response.data;
         level_id = response.data[response.data.length-1].id
         $http.get("http://localhost:8088/api/v1/lessons?level_id="+level_id+"&course_id="+course_id+"&pagination=true"+"&last=0",config)
           .then(function(res) {
             $scope.lecciones = res.data;
             console.log(res.data);
         });
      });

      $scope.refresh = function(){
        $http.get("http://localhost:8088/api/v1/lessons?level_id="+$scope.selected_level+"&course_id="+course_id+"&pagination=true"+"&last=0",config)
          .then(function(res) {
            $scope.lecciones = res.data;
            console.log($scope.lecciones);
        });
      }

      $scope.view = function(lessonID){
        console.log("JKKKK"+lessonID);
        $window.location.href = "/courses/"+course_id+"/lessons/"+lessonID;
      };

      $scope.update = function(lessonID) {
        $window.location.href = "/lesson/update/"+lessonID;
      }

      $scope.addLesson = function() {
        $window.location.href = "/new_lesson"
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
