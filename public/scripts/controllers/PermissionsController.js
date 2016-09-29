'use strict';

angular.module('CSM')

    .controller('PermissionsController', ['$scope', 'applicationFactory', function ($scope, applicationFactory) {


        $scope.applications = {};
        $scope.applications = applicationFactory.applicationList;

    }])