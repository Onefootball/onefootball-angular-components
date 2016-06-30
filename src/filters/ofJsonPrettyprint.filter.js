// From http://stackoverflow.com/questions/22776476/use-json-pretty-print-in-angularjs
angular
    .module('onefootball.components.filters')
    .filter('ofJsonPrettyprint', ofJsonPrettyprint);

function ofJsonPrettyprint() {
    function syntaxHighlight(json) {
        return JSON ?
            JSON.stringify(json, null, '  ') :
            'your browser doesnt support JSON so cant pretty print';
    }

    return syntaxHighlight;
}
