'use strict';

angular.module('CSM')

    .factory('loginFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "users/login", {}, {save: {isArray: false, method: "POST"}});

    }])

    .factory('registerFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "users/register", {}, {save: {isArray: false, method: "POST"}});

    }])