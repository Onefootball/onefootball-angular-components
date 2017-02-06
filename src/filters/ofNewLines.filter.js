angular
    .module('onefootball.components.filters')
    .filter('ofNewLines', ofNewLines);

function ofNewLines() {
    return function (input, opts) {
        var useParagraphs = (opts && opts.useParagraphs) || false;
        if (useParagraphs === true || useParagraphs === 'true') {
            return replaceWithPs(input);
        }
        return replaceWithBrs(input);
    };

    function replaceWithBrs(input) {
        // Replace all single or repeated newlines and single or repeated `<br/>`, `<br />` or `<br>` tags by a double `<br />`.
        if (input) {
            // `\n` to `<br />`, will be picked up on the next line
            input = input.replace(/(\n\s*){1,}/g, '<br />');
            // `<BR>`, `<br>` && `<br/>` && `<br />` && `<br />  <br />` and so on...
            input = input.replace(/(<br\s*\/?>\s*){1,}/gi, '<br /><br />');
        }
        return input;
    }

    function replaceWithPs(input) {
        var normString = replaceWithBrs(input) || '';
        normString = normString.replace(/(?:<\s{0,}br\s{0,}\/\s{0,}>)/gi, '<br>'); // <br /> --> <br>
        normString = normString.replace(/(?:<br>\s{0,}){1,}/gi, '</p><p>'); // <br> --> </p><p>
        normString = normString.replace(/^<\/p><p>/gi, '<p>');
        normString = normString.replace(/<\/p><p>$/gi, '</p>');
        if (normString.substring(0, 3) !== '<p>') {
            normString = '<p>' + normString;
        }
        if (normString.substring(normString.length - 4, normString.length) !== '</p>') {
            normString = normString + '</p>';
        }
        return normString;
    }
}
