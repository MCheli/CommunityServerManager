'use strict';

angular.module('CSM')

    .controller('PermissionsController', ['$scope', '$state', 'applicationFactory', '_', function ($scope, $state, applicationFactory, _) {

        $scope.applications = {};
        $scope.messageSubject = "";
        $scope.message = "";
        $scope.messageTarget = "";

        $scope.$on('$stateChangeSuccess', function () {
            $scope.applications = applicationFactory.query();
        });

        $scope.newUser = "";

        $scope.addUser = function (application) {
            $scope.addUsr = applicationFactory.save({
                id: application._id
            }, {
                add: true,
                username: $scope.applications.newUser
            });
            $scope.addUsr.$promise.then(function () {
                $scope.messageSubject = $scope.applications.newUser;
                $scope.message =  " has been added to the application ";
                $scope.messageTarget = application.applicationName;
            })
        };

        $scope.removeUser = function (application, username) {
            $scope.removeUsr = applicationFactory.update({
                id: application._id
            }, {
                "authorizedUsers": _.without(application.authorizedUsers, username)
            });
            $scope.removeUsr.$promise.then(function () {
                $scope.messageSubject = username;
                $scope.message = " has been removed from the application ";
                $scope.messageTarget = application.applicationName;
            })
        }
    }
    ]);