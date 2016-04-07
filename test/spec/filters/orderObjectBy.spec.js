(function () {
    'use strict';
    describe ('orderObjectBy', function () {

        var orderObjectBy;

        beforeEach(function () {
            module ('onefootball.components.filters.orderObjectBy');
        });

        beforeEach(inject(function ($filter) {
            orderObjectBy = $filter('orderObjectBy');
        }));

        it ('order object by string property - alphabetically', function () {
            var input = [
                {
                    id: 5,
                    name: 'Zan'
                },
                {
                    id: 1,
                    name: 'Masa'
                },
                {
                    id: 10,
                    name: 'Neza'
                }
            ];
            var result = orderObjectBy (input, 'name');
            expect (result[0].name).toEqual('Masa');
            expect (result[1].name).toEqual('Neza');
            expect (result[2].name).toEqual('Zan');
        });

        it ('order object by numerical property - sort', function () {
            var input = [
                {
                    id: 5,
                    name: 'Zan'
                },
                {
                    id: 1,
                    name: 'Masa'
                },
                {
                    id: 10,
                    name: 'Neza'
                }
            ];
            var result = orderObjectBy (input, 'id');
            expect (result[0].name).toEqual('Masa');
            expect (result[1].name).toEqual('Zan');
            expect (result[2].name).toEqual('Neza');
        });
    });
}) ();