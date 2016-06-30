angular
    .module('onefootball.components.filters')
    .filter('ofReplace', ofReplace);

function ofReplace() {
    return function (str, pattern, replacement, flags) {
        if (!flags) {
            flags = '';
        }
        var regExp = new RegExp(pattern, flags);
        return str.replace(regExp, replacement);
    };
}
