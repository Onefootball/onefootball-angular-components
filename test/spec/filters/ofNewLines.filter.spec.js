(function () {
    'use strict';
    describe ('ofNewLines', function () {
        var newlines;
        beforeEach(function () {
            module ('onefootball.components.filters');
        });

        beforeEach(inject(function ($filter) {
            newlines = $filter('ofNewLines');
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

        it('uses <p> elements 1', function () {
            var input = 'some text <br> <br> <br> <br> <br>';
            var result = '<p>some text </p>';
            expect(newlines(input, { useParagraphs: true })).toEqual(result);
        });

        it('uses <p> elements 2', function () {
            var input = 'some text <br> <br> <br> <br> <br>some text \n\n\n some text\n\n\n';
            var result = '<p>some text </p><p>some text </p><p>some text</p>';
            expect(newlines(input, { useParagraphs: true })).toEqual(result);
        });

        it('uses <p> elements 3', function () {
            var input = '\n\n\n\n\n\n some text <br> <br> <br> <br> <br>some text \n\n\n some text';
            var result = '<p>some text </p><p>some text </p><p>some text</p>';
            expect(newlines(input, { useParagraphs: true })).toEqual(result);
        });

    });
}) ();
