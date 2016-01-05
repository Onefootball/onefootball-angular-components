// http://justinklemm.com/angularjs-filter-ordering-objects-ngrepeat/
angular
    .module('onefootball.components.filters.orderObjectBy', [])
    .filter('orderObjectBy', orderObjectBy);

function orderObjectBy() {
    return function (items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse) {
            filtered.reverse();
        }
        return filtered;
    };
}
