angular
    .module('onefootball.components.filters')
    .filter('ofNewLines', ofNewLines);

function ofNewLines() {
    return function (input) {
        // Replace all single or repeated newlines and single or repeated `<br/>`, `<br />` or `<br>` tags by a double `<br />`.
        if (input) {
            // `\n` to `<br />`, will be picked up on the next line
            input = input.replace(/(\n\s*){1,}/g, '<br />');
            // `<BR>`, `<br>` && `<br/>` && `<br />` && `<br />  <br />` and so on...
            input = input.replace(/(<br\s*\/?>\s*){1,}/gi, '<br /><br />');
        }
        return input;
    };
}
