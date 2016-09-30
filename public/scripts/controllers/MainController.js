'use strict';

angular.module('CSM')

    .controller('MainController', ['$scope', '$rootScope', 'applicationFactory', function ($scope, $rootScope, applicationFactory) {

        $scope.applications = applicationFactory.query();


    }])