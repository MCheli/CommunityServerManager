'use strict';

angular.module('CSM')

    .controller('PermissionsController', ['$scope', 'applicationFactory', '_', function ($scope, applicationFactory, _) {

        $scope.applications = applicationFactory.query();
        $scope.newUser = "";

        $scope.addUser = function (application) {
            applicationFactory.save({
                id: application._id
            }, {
                add: true,
                username: $scope.applications.newUser
            })
        };

        $scope.removeUser = function (application, username) {
            applicationFactory.update({
                id: application._id
            }, {
                "authorizedUsers": _.without(application.authorizedUsers, username)
            })
        }
    }]);