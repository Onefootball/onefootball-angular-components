angular
    .module('demo', ['onefootball.components', 'ngSanitize'])
    .run(function ($rootScope, EventEnumerator, $window, Guid) {
        $rootScope.imageUrl = 'http://lorempixel.com/400/200/fashion/';
        $rootScope.$on(EventEnumerator.imgChangeSuccess, function () {
            $window.alert('Img successfully changed');
        });
        $rootScope.diacriticList = ['dégagé', 'déjà vu', 'démarche', 'démodé', 'dénouement', 'Mützen', 'tête-à-tête'];
        $rootScope.cyrillicList = ['радиатор', 'Антарктика', 'телеграмма', 'Англия', 'витамин', 'мираж', 'Шанхай'];
        $rootScope.customObject = {
            name: 'Sinisa',
            company: {
                name: 'Onefootball Gmbh',
                address: 'Greifswalder strasse 212'
            },
            status: 'Awesome',
            food: ['Steak, pizza, coffee']
        };
        $rootScope.newLinesText = 'This is some text\n that has a line break, <br/> <br/> <br/> <br/> <br/> \n\n\n\n\n which is unusual!';

        $rootScope.listOfObjects = [
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
        $rootScope.strReplace = 'aaaaaaaAaaaaaaabbbb';

        $rootScope.encodeURIExample = 'https://www.google.si/maps/search/greifswalder strasse 212';

        $rootScope.textForUrl = 'Jose Mourinho camp "frustrated" with Manchester Utd job situation - sources';

        $rootScope.generateGuid = function () {
            $rootScope.GUID = Guid.generate();
        };
    });