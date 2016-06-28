(function () {
    'use strict';
    describe ('ofOrderObjectBy', function () {

        var orderObjectBy;

        beforeEach(function () {
            module ('onefootball.components.filters');
        });

        beforeEach(inject(function ($filter) {
            orderObjectBy = $filter('ofOrderObjectBy');
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

        it ('order object by numerical property and reverse them', function () {
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
            var result = orderObjectBy (input, 'id', true);
            expect (result[0].name).toEqual('Neza');
            expect (result[1].name).toEqual('Zan');
            expect (result[2].name).toEqual('Masa');
        });
    });
}) ();
