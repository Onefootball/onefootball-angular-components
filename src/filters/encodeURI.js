angular
    .module('onefootball.components.filters.urlEncode', [])
    .filter('urlEncode', ['$window', urlEncodeFilter]);

function urlEncodeFilter($window) {
    return $window.encodeURI;
}
