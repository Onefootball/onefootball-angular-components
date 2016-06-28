angular
    .module('onefootball.components.filters')
    .filter('ofUrlEncode', ['$window', ofUrlEncode]);

function ofUrlEncode($window) {
    return $window.encodeURI;
}
