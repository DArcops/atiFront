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

    var baseUrl = "https://44b90368.ngrok.io"+"/api/v1"
    var config = {};
    var provider_id = $window.location.href.split("/")[4]
    var formdata = new FormData();
    $scope.selectedDevices = [];
    $scope.showModal = false;
    $scope.showModalAssignation = false;

    $scope.dataTableOpt = {
      dom: 'Bfrtip',
      destroy:true,
      buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    };


    loadDevices = function() {
      $http.get(baseUrl+"/providers/"+provider_id+"/devices").success(function(data, status, headers, config){
        $scope.devices = data;
      });
    }
    loadDevices()

    notifyAndReloadDevices = function(message) {
      swal({
        type: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2000
      });
      loadDevices();
    }


    $scope.sm = function() {
      $scope.showModal = !$scope.showModal;
    }

    $scope.smAssignation = function() {
      $scope.showModalAssignation = !$scope.showModalAssignation;
    }

    $http.get(baseUrl+"/providers/"+provider_id).success(function(data, status, headers, config){
      $scope.provider = data;
    });

    $http.get(baseUrl+"/users").success(function(data, status, headers, config){
      $scope.users = data;
    });

    $scope.clickedItem = function(device_id) {
      if ($scope.selectedDevices.indexOf(device_id) < 0) {
        $scope.selectedDevices.push(device_id);
      } else {
        $scope.selectedDevices.splice($scope.selectedDevices.indexOf(device_id),1)
      }
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
                 notifyAndReloadDevices("Device Created");
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
                      notifyAndReloadDevices("File Uploaded")
                    })
                    .error(function (e) {
                      console.log("err", e)
                    });
    }

    $scope.saveAssigment = function() {
      var data = {
        "user_name": $scope.user_assigned,
        "imeis": $scope.selectedDevices,
        "end_date": $scope.assigment_end_date,
        "description": $scope.assigment_description
      }
      $http.post(baseUrl+"/providers/"+provider_id+"/assigments", data, config)
               .success(function (data, status, headers, config) {
                 swal({
                   type: 'success',
                   title: "Assigment Created",
                   showConfirmButton: false,
                   timer: 2000
                 });
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

    $scope.showAssigmentInfo = function(assigment_id) {
      $scope.showModalAssignation = true;
      $http.get(baseUrl+"/providers/"+provider_id+"/assigments/"+assigment_id).success(function(data, status, headers, config){
        $scope.assigment = data;
        $scope.update_assigment_end_date = new Date($scope.assigment.end_date)
        console.log("Assigment END DATE", $scope.assigment.end_date)
        $scope.update_assigment_description = $scope.assigment.description;
        $scope.update_assigned_user = $scope.assigment.username;
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
