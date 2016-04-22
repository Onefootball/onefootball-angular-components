(function () {
    'use strict';
    describe ('urlText', function () {
        var urlText;
        beforeEach(function () {
            module ('onefootball.components.filters');
            module ('onefootball.components.services.diacriticsRemoval');
        });

        beforeEach(inject(function ($filter) {
            urlText = $filter('urlText');
        }));

        it ('converts unicode url to ascii - nicely', function () {
            var input = 'This is the most AWESOME article title with special chars - $%^%^&%^()*[cc and german letters äöüßÄÖÜ';
            expect (urlText (input)).toEqual ('this-is-the-most-awesome-article-title-with-special-chars-cc-and-german-letters-aeoeuessaeoeue');
        });

        it ('can handle unicode slugs', function () {
            var input = 'Siniša Grubor';
            expect (urlText (input)).toEqual ('sinisa-grubor');
        });

        it ('can handle empty string', function () {
            var input = '';
            expect (urlText (input)).toEqual ('');
        });

        it ('can handle undefined input', function () {
            var input;
            expect (urlText (input)).toEqual ('');
        });
    });
}) ();