angular
    .module('onefootball.components.filters.replace', [])
    .filter('replace', replace);

function replace() {
    return function (str, pattern, replacement, flags) {
        if (!flags) {
            flags = '';
        }
        var regExp = new RegExp(pattern, flags);
        return str.replace(regExp, replacement);
    };
}
