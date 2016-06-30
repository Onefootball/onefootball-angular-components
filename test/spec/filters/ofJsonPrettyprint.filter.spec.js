(function () {
    'use strict';
    describe ('ofJsonPrettyprint', function () {
        var jsonPrettyprint;
        beforeEach(function () {
            module ('onefootball.components.filters');
        });

        beforeEach(inject(function ($filter) {
            jsonPrettyprint = $filter('ofJsonPrettyprint');
        }));

        it ('encodes url correctly', function () {
            var person = {
                name: "Jim Cowart",
                location: {
                    city: {
                        name: "Chattanooga",
                        population: 167674
                    },
                    state: {
                        name: "Tennessee",
                        abbreviation: "TN",
                        population: 6403000
                    }
                },
                company: "appendTo"
            };
            var raw = JSON.stringify (person);
            var pretty = jsonPrettyprint(person);

            expect (raw.length).toBeLessThan(pretty.length);
        });
    });
}) ();
