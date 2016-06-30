angular
    .module('onefootball.components.filters')
    .filter('ofDiacriticStrip', ['ofDiacriticsRemoval', ofDiacriticStrip]);

function ofDiacriticStrip(ofDiacriticsRemoval) {
    return function (input) {
        return ofDiacriticsRemoval.stripDiacritics(input);
    };
}
