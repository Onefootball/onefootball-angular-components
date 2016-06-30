(function () {
    'use strict';
    describe ('ofReplace', function () {
        var replace;
        beforeEach(function () {
            module ('onefootball.components.filters');
        });

        beforeEach(inject(function ($filter) {
            replace = $filter('ofReplace');
        }));

        it ('replace single occurrence', function () {
            var input = 'aaa';
            expect (replace (input, 'a', 'c')).toEqual ('caa');
        });

        it ('replace globally', function () {
            var input = 'aaa';
            expect (replace (input, 'a', 'c', 'g')).toEqual ('ccc');
        });

        it ('handles casing correctly on single occurrence (flags)', function () {
            var input = 'Aaa';
            expect (replace (input, 'a', 'c')).toEqual ('Aca');
        });

        it ('handles casing correctly globally (flags)', function () {
            var input = 'Aaa';
            expect (replace (input, 'a', 'c', 'g')).toEqual ('Acc');
        });

        it ('handles casing insensitivity correctly globally (flags)', function () {
            var input = 'Aaa';
            expect (replace (input, 'a', 'c', 'gi')).toEqual ('ccc');
        });
    });
}) ();
