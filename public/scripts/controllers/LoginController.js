'use strict';

angular.module('CSM')

    .controller('LoginController', ['$scope', 'loginFactory', 'registerFactory', function ($scope, loginFactory, registerFactory) {

        $scope.loginForm = true;
        $scope.registerForm = false;

        $scope.loginUsername = "";
        $scope.loginPassword = "";

        $scope.registerUsername = "";
        $scope.registerPassword = "";
        $scope.registerPasswordConfirmation = "";

        $scope.errorMsg = "";

        $scope.login = new loginFactory(); //You can instantiate resource class
        $scope.register = new registerFactory(); //You can instantiate resource class

        $scope.loginUser = function () {
            //    Login Post
            var body = {
                username: $scope.loginUsername,
                password: $scope.loginPassword
            };
            $scope.login.$save(body).then(function (response) {
                console.log(response)

            })
        };

        $scope.registerUser = function () {
            if ($scope.registerPassword && $scope.registerPasswordConfirmation) {
                //    Register Post
            } else {
                $scope.errorMsg = "Password Don't Match"
            }
        }
    }])