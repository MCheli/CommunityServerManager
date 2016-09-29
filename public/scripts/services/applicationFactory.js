'use strict';

angular.module('CSM')

    .factory('applicationFactory', ['$resource', 'baseURL', 'AuthFactory', function ($resource, baseURL, AuthFactory) {
        return $resource(baseURL + "applications/:id", null,
            {
                'query': {
                    method: 'GET',
                    isArray: true,
                    headers: {'auth-token': AuthFactory.authToken}
                }
            });
    }])