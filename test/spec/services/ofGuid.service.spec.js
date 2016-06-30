(function () {
    'use strict';
    describe('ofGuid', function () {
        var guid;
        var format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

        beforeEach(function () {
            module('onefootball.components.services');
        });

        beforeEach(inject(function (ofGuid) {
            guid = ofGuid;
        }));

        it('generates guid in right format', function () {
            var g = guid.generate();
            var split = g.split('-');
            expect(g.length).toEqual(format.length);
            expect(g).not.toEqual(format);
            expect(split.length).toEqual(5);
        });
    });
})();
