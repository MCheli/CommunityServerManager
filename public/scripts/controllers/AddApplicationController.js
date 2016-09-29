'use strict';

angular.module('CSM')

    .controller('AddApplicationController', ['$scope', 'applicationFactory', 'AuthFactory', function ($scope, applicationFactory, AuthFactory) {

        $scope.applications = {};
        $scope.applications = applicationFactory.getApplications();


    }])