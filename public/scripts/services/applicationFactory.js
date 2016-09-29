'use strict';

angular.module('CSM')

    .factory('applicationFactory', ['$resource', 'baseURL', 'AuthFactory', function ($resource, baseURL, AuthFactory) {

        var applicationFactory = {};
        var applicationList = {};

        applicationFactory.getApplications = function () {
            applicationList = $resource(baseURL + "applications", null, {
                'update': {
                    method: 'GET',
                    // isArray: false,
                    headers: {'auth-token': AuthFactory.authToken}
                }
            }).query()

            return applicationList;
        }

        return applicationFactory

    }])