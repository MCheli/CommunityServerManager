'use strict';

angular.module('CSM')

    .controller('ApplicationController', ['$scope', '$stateParams', 'applicationFactory', 'scriptFactory', function ($scope, $stateParams, applicationFactory, scriptFactory) {

        $scope.application = {}

        $scope.$on('$stateChangeSuccess', function () {
            $scope.application = applicationFactory.get({
                id: $stateParams.name
            })
        })


        $scope.scriptName = "";
        $scope.scriptDescription = "";
        $scope.scriptCommand = "";

        $scope.createScript = function () {
            var body = {
                "scriptName": $scope.scriptName,
                "scriptDescription": $scope.scriptDescription,
                "scriptCommand": $scope.scriptCommand
            }
            scriptFactory.save({
                id: $stateParams.name
            }, body)
            // $state.go('main')
        }

        $scope.executeScript = function (scriptId) {
            scriptFactory.save({
                id: $stateParams.name,
                scriptId: scriptId
            }, {})
        }

        $scope.deleteScript = function (scriptId) {
            scriptFactory.delete({
                id: $stateParams.name,
                scriptId: scriptId
            }, {})
        }

    }])