angular
    .module('onefootball.components.filters.diacriticStrip', [])
    .filter('diacriticStrip', ['DiacriticsRemoval', diacriticStrip]);

function diacriticStrip(DiacriticsRemoval) {
    return function (input) {
        return DiacriticsRemoval.stripDiacritics(input);
    }
}