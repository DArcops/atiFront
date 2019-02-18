
var app = angular.module('app', [])
  app.controller('Stats',  function($scope, $http, $window) {

    var config = {
      headers: {
          'Authorization': localStorage.getItem("token")
      }
    };

    var location = $window.location.pathname;
    var course_id = location.substring(location.length-1,location.length)

    $http.get("http://localhost:8088/api/v1/users/profile",config)
    .then(function(response) {
      $scope.administrator = response.data.administrator;
    });


    $http.get("http://localhost:8088/api/v1/courses/",config)
      .then(function(response) {
        $scope.courses = response.data;
        var cid = $scope.courses[$scope.courses.length-1].id;
        console.log(response.data);

        $http.get("http://localhost:8088/api/v1/courses/"+cid+"/users_suscribed",config)
          .then(function(response) {
            $scope.users = response.data;
            console.log($scope.users);
        });

    });

    $http.get("http://localhost:8088/api/v1/solutions",config)
    .then(function(response) {
      console.log(response.data)
      $scope.acceptedSolutions = response.data.accepted;
      $scope.wrongSolutions = response.data.wrong;
    });


    $scope.change = function() {
      $http.get("http://localhost:8088/api/v1/courses/"+$scope.selectedCourse+"/users_suscribed",config)
        .then(function(response) {
          $scope.users = response.data;
          console.log($scope.users);
      });
    };

    var labels = [];
    var data = [];

    $http.get("http://localhost:8088/api/v1/courses/",config)
      .then(function(response) {
        var re = response.data;
        for(var i =0; i < re.length; i++){
          labels.push(re[i].name)
          data.push(re[i].suscribers)
        }
        var oilCanvas = document.getElementById("oilChart");
        Chart.defaults.global.defaultFontFamily = "Lato";
        Chart.defaults.global.defaultFontSize = 15;
        var oilData = {
        labels: labels,
        datasets: [
        {
        data: data,
        backgroundColor: [
        "#84FF63",
        "#8463FF",
        "#6384FF",
        "#FB8C00",
        "#616161",
        "#76FF03",
        ]
        }]
        };
        var pieChart = new Chart(oilCanvas, {
        type: 'pie',
        data: oilData
        });
    });


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
