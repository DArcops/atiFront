
var app = angular.module('app', [])
  app.controller('Update_Lesson',  function($scope, $http, $window) {

    var config = {
      headers: {
          'Authorization': localStorage.getItem("token")
      }
    };

    var location = $window.location.pathname;
    var lesson_id = location.substring(location.length-1,location.length)

    $http.get("http://localhost:8088/api/v1/lessons/"+lesson_id,config)
      .then(function(response) {
        $scope.lesson_name = response.data.name;
        $scope.lesson_description =response.data.description;
        $('#summernote').summernote('code',response.data.code);
        console.log(response.data);
    });

    $scope.submit = function() {
      var url = "http://localhost:8088/api/v1/lessons/update/"+lesson_id;
      var data = {
        "name" : $scope.lesson_name,
        "code": $('#summernote').summernote('code'),
        "description": $scope.lesson_description
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
                if(status == 401)
                  $window.location.href = "/login"

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
