'use strict';

angular.module('CSM')

    .controller('ApplicationController', ['$scope', '$stateParams', 'applicationFactory', function ($scope, $stateParams, applicationFactory) {

        $scope.application = {}

        $scope.$on('$stateChangeSuccess', function () {
            $scope.application = applicationFactory.get({
                id: $stateParams.name
            })
        })
        
    }])