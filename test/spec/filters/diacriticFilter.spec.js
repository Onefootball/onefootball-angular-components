(function () {
    'use strict';
    describe ('diacriticStrip', function () {
        var diacriticFilter;

        beforeEach (function () {
            module ('onefootball.components.filters.diacriticStrip');
            module ('onefootball.components.services.diacriticsRemoval');
        });

        beforeEach (inject(function ($filter) {
            diacriticFilter = $filter ('diacriticStrip');
        }));

        it('should convert german umlaut correctly', inject(function () {
            var input = 'äöüßÄÖÜ';
            var result = 'aeoeuessAEOEUE';
            expect(diacriticFilter(input)).toEqual(result);
        }));

        it('should convert slavic chars correctly', inject(function () {
            var input = 'Siniša, Đakovo, Čekić';
            var result = 'Sinisa, DZakovo, Cekic';
            expect(diacriticFilter(input)).toEqual(result);
        }));

        it('should convert turkish chars correctly', inject(function () {
            var input = 'değildi, Şampiyonlar, açıklamalarda';
            var result = 'degildi, Sampiyonlar, aciklamalarda';
            expect(diacriticFilter(input)).toEqual(result);
        }));

        it('should convert french chars correctly', inject(function () {
            var input = 'médecin, très, forêt, français, Jamaïque';
            var result = 'medecin, tres, foret, francais, Jamaique';
            expect(diacriticFilter(input)).toEqual(result);
        }));

        it('should convert spanish chars correctly', inject(function () {
            var input = 'Piqué cree que Neymar no dejará el Barça';
            var result = 'Pique cree que Neymar no dejara el Barca';
            expect(diacriticFilter(input)).toEqual(result);
        }));
    })

}) ();