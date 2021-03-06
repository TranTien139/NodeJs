var myApp = angular.module('myApp', []);

myApp.controller('AppCtr', ['$scope', '$http', function ($scope, $http) {
    var refresh = function () {
        $http.get('/contactlist').success(function (response) {
            console.log("I got the data I requested");
            $scope.contactlist = response;
            $scope.contact = "";
        });
    };
    refresh();

    $scope.parserMessage = function (id) {
        $http.get('/contactlist/' + id).success(function (response) {
            $scope.contact = response;
        });
        var data = {
            user_id: $scope.user_id,
            recive_id: id
        };

        $http.post('/getmessage', data).success(function () {
            console.log('post success');
        }).error(function (err) {
            console.log('post fail');
        });
    };

}]);