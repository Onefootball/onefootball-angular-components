(function () {
    'use strict';
    describe ('ofUrlEncode', function () {
    var urlEncode;
        beforeEach(function () {
            module ('onefootball.components.filters');
        });

        beforeEach(inject(function ($filter) {
            urlEncode = $filter('ofUrlEncode');
        }));

        it ('encodes url correctly', function () {
            var input = 'my test.asp?name=ståle&car=saab';
            var result = 'my%20test.asp?name=st%C3%A5le&car=saab';
            expect (urlEncode (input)).toEqual (result);
        });
    });
}) ();
