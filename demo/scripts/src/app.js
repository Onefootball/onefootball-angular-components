

var demoApp = angular.module('demoModule', [
    'ngRoute',
    'demoControllers',
    'onefootball.components',
    'ngSanitize'
]);

demoApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(false).hashPrefix('!');

        $routeProvider.
        when('/', {
            templateUrl: 'views/base.html',
            controller: 'baseCtrl'
        }).
        when('/directives', {
            templateUrl: 'views/directives.html',
            controller: 'directiveCtrl'
        }).
        when('/filters', {
            templateUrl: 'views/filters.html',
            controller: 'filterCtrl'
        }).
        when('/services', {
            templateUrl: 'views/services.html',
            controller: 'serviceCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);
