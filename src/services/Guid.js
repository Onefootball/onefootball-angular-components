angular
    .module('onefootball.components.services.Guid', [])
    .service('Guid', ['$window', guidProvider]);

function guidProvider($window) {

    function Guid() {
    }

    Guid.prototype.generate = function () {
        var d = $window.Date.now();
        return calculateGuid(d);
    };

    var calculateGuid = function (seed) {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (seed + $window.Math.random() * 16) % 16 | 0;
            seed = $window.Math.floor(seed / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        }).toUpperCase();
    };

    return new Guid();
}
