(function () {
    'use strict';
    describe ('jsonPrettyprint', function () {
        var jsonPrettyprint;
        beforeEach(function () {
            module ('onefootball.components.filters.jsonPrettyprint');
        });

        beforeEach(inject(function ($filter) {
            jsonPrettyprint = $filter('jsonPrettyprint');
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