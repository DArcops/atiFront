var app = angular.module('customerApp', ['datatables']);

app.directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
} ])


app.controller('customerController', function($scope, $http, $window ,DTOptionsBuilder){

    var baseUrl = "http://localhost:8088/api/v1"
    var config = {};
    var provider_id = $window.location.href.split("/")[4]
    var formdata = new FormData();
    $scope.selectedDevices = [];
    $scope.showModal = false;

    $scope.dataTableOpt = {
      dom: 'Bfrtip',
      buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    };

    loadDevices = function() {
      $http.get(baseUrl+"/providers/1/devices").success(function(data, status, headers, config){
        $scope.devices = data;
      });
    }
    loadDevices()

    $scope.sm = function() {
      $scope.showModal = !$scope.showModal;
    }

    $scope.clickedItem = function(device_id) {
      if ($scope.selectedDevices.indexOf(device_id) < 0) {
        $scope.selectedDevices.push(device_id);
      } else {
        $scope.selectedDevices.splice($scope.selectedDevices.indexOf(device_id),1)
      }
      console.log("clicked", device_id)
      console.log("items", $scope.selectedDevices)
    }


    $scope.saveDevice = function() {
      var data = {
        "provider_id": parseInt(provider_id),
        "imei": $scope.imei.toString(),
        "mpn": $scope.mpn,
        "name": $scope.name,
        "ubication": $scope.ubication,
        "admission_date": $scope.admission_date,
      }
      console.log("add provider data", data)
      $http.post(baseUrl+"/providers/"+provider_id+"/devices", data, config)
               .success(function (data, status, headers, config) {
                 swal({
                   type: 'success',
                   title: 'Device Created',
                   showConfirmButton: false,
                   timer: 1500
                 })
                 loadDevices();
               })
               .error(function (data, status, header, config) {
                 swal({
                   type: 'warning',
                   title: 'An error ocurred',
                   showConfirmButton: false,
                   timer: 2500
                 })
               });
    }

    $scope.getTheFiles = function ($files) {
              console.log("QUE PEDO selc", $files)
               angular.forEach($files, function (value, key) {
                   formdata.append("file", value);
               });
    };

    $scope.uploadFiles = function () {

                var request = {
                    method: 'POST',
                    url: baseUrl+"/providers/"+provider_id+"/devices/upload_file",
                    data: formdata,
                    headers: {
                        'Content-Type': undefined
                    }
                };

                // SEND THE FILES.
                $http(request)
                    .success(function (d) {
                        alert(d);
                        loadDevices();
                        console.log("hecho", d)
                    })
                    .error(function (e) {
                      console.log("err", e)
                    });
    }

});


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
