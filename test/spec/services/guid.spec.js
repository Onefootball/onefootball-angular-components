(function () {
    'use strict';
    describe ('guid', function () {
        var guid;
        var format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

        beforeEach(function () {
            module ('onefootball.components.services.guid');
        });

        beforeEach(inject(function (Guid) {
            guid = Guid;
        }));

        it ('generates guid in right format', function () {
            var g = guid.generate();
            var split = g.split('-');
            expect (g.length).toEqual (format.length);
            expect (g).not.toEqual (format);
            expect (split.length).toEqual (5);
        });
    });
}) ();