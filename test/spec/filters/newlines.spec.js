(function () {
    'use strict';
    describe ('newlines', function () {
        var newlines;
        beforeEach(function () {
            module ('onefootball.components.filters.newlines');
        });

        beforeEach(inject(function ($filter) {
            newlines = $filter('newlines');
        }));

        it ('normalizes line breaks correctly', function () {
            var input = 'some text\n\n\n';
            var result = 'some text<br /><br />';
            expect (newlines(input)).toEqual(result);
        });

        it ('normalizes line breaks (html) correctly', function () {
            var input = 'some text <br> <br> <br> <br> <br>';
            var result = 'some text <br /><br />';
            expect (newlines(input)).toEqual(result);
        });
    });
}) ();