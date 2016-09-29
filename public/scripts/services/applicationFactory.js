'use strict';

angular.module('CSM')

    .factory('applicationFactory', ['$resource', 'baseURL', 'AuthFactory', function ($resource, baseURL, AuthFactory) {

        var applicationFactory = {};
        var applicationList;

        applicationFactory.getApplications = function () {
            $resource(baseURL + "applications", null, {
                'update': {
                    method: 'GET',
                    // isArray: false,
                    headers: {'auth-token': AuthFactory.authToken}
                }
            }).query({}, function(response) {
                // console.log(response)
                applicationList = response[0];
                console.log(response[0])
            })

            // return applicationList;
        }

        return applicationFactory

    }])