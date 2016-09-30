'use strict';

angular.module('CSM')

    .controller('ApplicationController', ['$scope', '$state', '$window', '$stateParams', 'applicationFactory', 'scriptFactory', 'AuthFactory', function ($scope, $state, $window, $stateParams, applicationFactory, scriptFactory, AuthFactory) {

        $scope.application = {}
        $scope.admin = AuthFactory.getAdmin();

        $scope.$on('$stateChangeSuccess', function () {
            $scope.application = applicationFactory.get({
                id: $stateParams.name
            })
        })

        $scope.scriptName = "";
        $scope.scriptDescription = "";
        $scope.scriptCommand = "";

        $scope.deleteApplication = function () {
            $scope.deleteApp = applicationFactory.delete({
                id: $stateParams.name
            }, {})
            $scope.deleteApp.$promise.then(function () {
                $state.go('main')
                $window.location.reload();
            });
        }

        $scope.createScript = function () {
            var body = {
                "scriptName": $scope.scriptName,
                "scriptDescription": $scope.scriptDescription,
                "scriptCommand": $scope.scriptCommand
            }
            $scope.saveScript = scriptFactory.save({
                id: $stateParams.name
            }, body)
            $scope.saveScript.$promise.then(function () {
                $scope.application = applicationFactory.get({
                    id: $stateParams.name
                })
                $scope.scriptName = "";
                $scope.scriptDescription = "";
                $scope.scriptCommand = "";
            });
        }

        $scope.executeScript = function (scriptId) {
            scriptFactory.save({
                id: $stateParams.name,
                scriptId: scriptId
            }, {})
        }

        $scope.deleteScript = function (scriptId) {
            $scope.delScript = scriptFactory.delete({
                id: $stateParams.name,
                scriptId: scriptId
            }, {})
            $scope.delScript.$promise.then(function () {
                $scope.application = applicationFactory.get({
                    id: $stateParams.name
                })
            })
        }
    }
    ])