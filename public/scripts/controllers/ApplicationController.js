'use strict';

angular.module('CSM')

    .controller('ApplicationController', ['$scope', 'applicationFactory', function ($scope, applicationFactory) {

        $scope.applications = {};

        // $scope.applications = applicationFactory.getApplications();

    }])