
var app = angular.module('app', [])
  app.controller('Exercise',  function($scope, $http, $window) {

    console.log("ejercitando... "+editor.getValue())
    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

    editor.resize.bind(editor,null)

    $scope.loadingTest = false;
    $scope.loadingSolution = false;



      $('#summernote').summernote({
        //focus: true,                 // set focus to editable area after initializing summernote
        minHeight: 500
      });

      $scope.output = ["Salida..."]

      editor.setOptions({
        fontSize: "11pt"
      });

      var location = $window.location.pathname
      exercise_id = location.substring(location.lastIndexOf("/")+1,location.length)

      var slash = [];
      for(var i= 0; i < location.length; i++)
        if(location[i] == "/")
          slash.push(i);

      var course_id = "";
      var lesson_id = location.substring(slash[3]+1,slash[4]);
      var exercise_id = location.substring(slash[5]+1,location.length)

      for(var i = 9; ; i++)
        if(location[i] == "/") break;
        else course_id += location[i];

        var config = {
          headers: {
            'Authorization': localStorage.getItem("token")
          }
        };

        $http.get("http://localhost:8088/api/v1/users/profile",config)
        .then(function(response) {
          $scope.administrator = response.data.administrator;
        });

      $http.get("http://localhost:8088/api/v1/exercises/"+exercise_id+"?course_id="+course_id+"&lesson_id="+lesson_id,config)
      .then(function(response) {
        console.log(response.data);
        $('#summernote').summernote('code',response.data.code);
        $('#summernote').summernote('destroy');
      });

      $scope.update = function() {
        $window.location.href = "/exercise/update/"+exercise_id+"/"+lesson_id
      }

      $scope.probar = function(){
        $scope.loadingTest = true;
        var code = editor.getValue();

        var url = "http://localhost:8088/api/v1/solutions/"+exercise_id+"?course_id="+course_id+"&lesson_id="+lesson_id
        var data = {
          "code": code
        }

        $http.post(url, data,config)
                .success(function (response) {
                  console.log("Ya se compilo "+response )
                  $scope.output = response.split("\n");
                  $scope.loadingTest = false;
                })
                .error(function (data, status, header, config) {
                  console.log(data)
                });

      }

      $scope.solve = function(){
        $scope.loadingSolution = true;
        var code = editor.getValue();

        var url = "http://localhost:8088/api/v1/solutions/"+exercise_id+"/solve?course_id="+course_id+"&lesson_id="+lesson_id
        var data = {
          "code": code,
        }

        $http.post(url, data,config)
                .success(function (response) {
                  $scope.loadingSolution = false;
                  console.log(response)
                  $scope.output = response.output.split("\n");
                  if(response.status == "Wrong"){
                    swal({
                      type: 'error',
                      title: 'Solucion incorrecta',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  } else if(response.status == "Acepted"){
                    swal({
                      type: 'success',
                      title: 'Respuesta correcta',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                })
                .error(function (data, status, header, config) {
                  console.log(data)
                  $scope.loadingSolution = false;
                });

      }



  });
////////////////////////////////////////////////////////////////////
app.controller('MoreExercises',function($timeout,$scope,$http,$window) {

        var location = $window.location.pathname
        exercise_id = location.substring(location.lastIndexOf("/")+1,location.length)

        var slash = [];
        for(var i= 0; i < location.length; i++)
          if(location[i] == "/")
            slash.push(i);

        var course_id = "";
        var lesson_id = location.substring(slash[3]+1,slash[4]);

        for(var i = 9; ; i++)
          if(location[i] == "/") break;
          else course_id += location[i];

    var config = {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    };

  $http.get("http://localhost:8088/api/v1/exercises?course_id="+course_id+"&lesson_id="+lesson_id,config)
  .then(function(response) {
    $scope.exercises = response.data;
  });

})
/////////////////////////////////////////////////

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
