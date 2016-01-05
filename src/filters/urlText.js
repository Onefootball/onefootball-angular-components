angular
    .module('onefootball.components.filters.urlText', [])
    .filter('urlText', ['DiacriticsRemoval', '$filter', urlText]);

//spec:
// - use only small letters in the URL
// - avoid punctuation marks like ? and ! or other special characters ", & or + (except in attached parameters)

function urlText(DiacriticsRemoval, $filter) {
    return function (input) {
        if (!input) {
            return '';
        }
        input = $filter('cyrillic2latin') (input);
        //first replace accents
        input = DiacriticsRemoval.stripDiacritics(input);
        //remove punctuation and strange chars
        input = input.replace(/[^A-Za-z0-9\-\s]/g, '');
        //replace multiple spaces by single spaces
        input = input.replace(/  +/g, ' ');
        //trim because of the possible leading space
        input = input.trim();
        //replace spaces by -
        input = input.replace(/ /g, '-');
        //replace multiple hypens by single - this is needed, because this might already be inside of title next to space
        input = input.replace(/--+/g, '-');
        //remove last char if it's hypen - if it was ended
        input = input.replace(/-*$/, "");
        return input.toLowerCase();
    };
}
