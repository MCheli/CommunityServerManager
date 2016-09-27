angular.module('CSM', ['ui.router', 'ngResource'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home')
        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {
                        templateUrl: './views/landing.html',
                    },
                }
            })
            .state('main', {
                url: '/main',
                templateUrl: "views/main.html",
                controller: "MainController"
            })
            .state('main.application', {
                url: '/application/:name',
                templateUrl: "views/application.html",
                controller: "ApplicationController",
                resolve: {
                    name: ['$stateParams', function ($stateParams) {
                        return $stateParams.name;
                    }]
                }
            })
            .state('main.permissions', {
                url: '/permissions',
                templateUrl: "views/permissions.html",
                controller: 'PermissionsController'
            })
            .state('main.addApplication', {
                url: '/addapplication',
                templateUrl: "views/addApplication.html",
                controller: 'AddApplicationController'
            })
    }])