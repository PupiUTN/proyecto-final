/**
 * Created by gabriellorenzatti on 31/5/17.
 */
var app=angular.module("app",[]);

app.controller("razaController",['$scope','$log','$http',function($scope,$log,$http, raza, Notification) {
        $scope.raza =  raza|| {};
         $scope.myData = null;

       //  var HostUrl="http://" + window.location.host + "/"; ;


    var url = hostURL + 'api/razas';
        $scope.mostrarNuevaRaza = function () {
            $('#nuevaRaza').toggle();
        };

    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };



    $scope.save = function ()
        { var data = $scope.raza;
            $http.post(url, data)
                .success(function (data, status, headers, config) {
                    $scope.message = data;
                    alert( "exito : "   + $scope.message  + status);
                })
                .error(function (data, status, header, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });


        };
            $scope.cancelar = function (){
                $('#nuevaRaza').toggle();
            };
}]);