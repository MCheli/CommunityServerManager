'use strict';

angular.module('CSM')

    .controller('AddApplicationController', ['$scope', 'applicationFactory', 'AuthFactory', function ($scope, applicationFactory, AuthFactory) {

        $scope.applications = {};
        applicationFactory.getApplications();
        $scope.applications = AuthFactory.applicationList;

        $scope.load = function () {
            $scope.applications = AuthFactory.applicationList;
        }


    }])