'use strict';

angular.module('CSM')

    .factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', function ($resource, $http, $localStorage, $rootScope, $window, baseURL) {

        var authFac = {};
        var TOKEN_KEY = 'Token';
        var isAuthenticated = false;
        var username = '';
        var authToken = undefined;
        var admin = false;


        function loadUserCredentials() {
            var credentials = $localStorage.getObject(TOKEN_KEY, '{}');
            if (credentials.username != undefined) {
                useCredentials(credentials);
            }
        }

        function storeUserCredentials(credentials) {
            $localStorage.storeObject(TOKEN_KEY, credentials);
            useCredentials(credentials);
        }

        function useCredentials(credentials) {
            isAuthenticated = true;
            username = credentials.username;
            authToken = credentials.token;
            admin = credentials.admin;

            // Set the token as header for your requests!
            $http.defaults.headers.common['x-access-token'] = authToken;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            username = '';
            isAuthenticated = false;
            $http.defaults.headers.common['x-access-token'] = authToken;
            $localStorage.remove(TOKEN_KEY);
        }

        authFac.login = function (loginData) {

            $resource(baseURL + "users/login")
                .save(loginData,
                    function (response) {
                        storeUserCredentials({
                            username: loginData.username,
                            token: response.token,
                            admin: response.admin
                        });
                        $rootScope.$broadcast('login:Successful');
                    },
                    function (response) {
                        isAuthenticated = false;
                    }
                );

        };

        authFac.logout = function () {
            $resource(baseURL + "users/logout").get(function (response) {
            });
            destroyUserCredentials();
        };

        authFac.register = function (registerData) {

            $resource(baseURL + "users/register")
                .save(registerData,
                    function (response) {
                        authFac.login({username: registerData.username, password: registerData.password});

                        $localStorage.storeObject('userinfo',
                            {username: registerData.username, password: registerData.password});

                        $rootScope.$broadcast('registration:Successful');
                    },
                    function (response) {

                    }
                );
        };

        authFac.isAuthenticated = function () {
            return isAuthenticated;
        };

        authFac.getUsername = function () {
            return username;
        };

        authFac.getAdmin = function() {
            return admin;
        }

        loadUserCredentials();

        return authFac;

    }])
;