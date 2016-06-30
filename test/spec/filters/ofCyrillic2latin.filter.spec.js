(function () {
    'use strict';
    describe('ofCyrillic2Latin filter', function () {
        var cyrillic2latin;

        beforeEach(function () {
            module('onefootball.components.filters');
        });

        beforeEach(inject(function ($filter) {
            cyrillic2latin = $filter('ofCyrillic2Latin');
        }));

        it('it should transliterate здорово to zdorov', inject(function () {
            var word = 'здоров';
            var result = 'zdorov';
            expect (cyrillic2latin(word)).toBe(result);
        }));

        it('it should transliterate Оно работает to Ono rabotaet', inject(function () {
            var word = 'Оно работает';
            var result = 'Ono rabotaet';
            expect (cyrillic2latin(word)).toBe(result);
        }));


        it('it should be able to handle full paragraphs', inject(function () {

            var paragraph = 'Хаж луптатум дигнижжим жкрибэнтур но, эррэм либриз ыт мыа. ' +
                'Хёз мацим ридэнж мэдиокретатым йн, копиожаы квюаэчтио витюпырата квюо нэ, ' +
                'эа мыис пожжёт интылльэгэбат квуй. Зймюл элитр пырикульа эю ыюм. Эож ед аэквюы ' +
                'попюльо дэлььиката, ты дольор фабулаз зальютатуж ючю. Видэ чонэт лудуз квюо эи. ' +
                'Но мэя дытракжйт окюррырэт аргюмынтум, долорюм импэрдеэт ед хёз.';

            var transliteration = 'Hazh luptatum dignizhzhim zhkribentur no, errem libriz it mia. ' +
                'Hyoz matsim ridenzh mediokretatim in, kopiozhai kvyuaechtio vityupirata kvyuo ne, ' +
                'ea miis pozhzhyot intill\'egebat kvui. Zimyul elitr pirikul\'a eyu iyum. Eozh ed aekvyui ' +
                'popyul\'o del\'\'ikata, ti dol\'or fabulaz zal\'yutatuzh yuchyu. Vide chonet luduz kvyuo ei. ' +
                'No meya ditrakzhit okyurriret argyumintum, doloryum imperdeet ed hyoz.';

            expect (cyrillic2latin(paragraph)).toBe(transliteration);
        }));
    })
})();

