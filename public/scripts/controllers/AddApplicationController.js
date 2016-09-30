'use strict';

angular.module('CSM')

    .controller('AddApplicationController', ['$scope', '$state', 'applicationFactory', 'AuthFactory', function ($scope, $state, applicationFactory, AuthFactory) {

        $scope.applicationName = "";
        $scope.applicationDescription = "";
        $scope.errorMsg = "";
        $scope.username = AuthFactory.getUsername();

        $scope.createApplication = function () {
            var body = {
                "applicationName": $scope.applicationName,
                "applicationDescription": $scope.applicationDescription,
                "authorizedUsers": [$scope.username],
                "scripts": []
            }
            applicationFactory.save(body)
            $state.go('main')
        }
        
    }])