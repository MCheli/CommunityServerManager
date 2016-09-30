'use strict';

angular.module('CSM')

    .controller('LoginController', ['$scope', '$state', '$rootScope', 'AuthFactory', function ($scope, $state, $rootScope, AuthFactory) {

        $scope.loginForm = true;
        $scope.registerForm = false;

        $scope.loginUsername = "";
        $scope.loginPassword = "";

        $scope.registerUsername = "";
        $scope.registerPassword = "";
        $scope.registerPasswordConfirmation = "";

        $scope.errorMsg = "";
        $scope.error = false;

        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
            $state.go('main');
        });

        $rootScope.$on('registration:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
            $state.go('main');
        });

        $scope.loginUser = function () {
            if ($scope.loginUsername && $scope.loginPassword) {
                var body = {
                    username: $scope.loginUsername,
                    password: $scope.loginPassword
                };
                AuthFactory.login(body)
            }
        };

        $scope.registerUser = function () {
            if ($scope.registerPassword === $scope.registerPasswordConfirmation) {
                var body = {
                    username: $scope.registerUsername,
                    password: $scope.registerPassword
                };
                AuthFactory.register(body)
            } else {
                $scope.errorMsg = "Password Don't Match"
            }
        }
    }]);