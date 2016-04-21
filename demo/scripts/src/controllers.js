var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('baseCtrl', function () {});

demoControllers.controller('directiveCtrl', ['$scope', '$window', 'EventEnumerator', function ($scope, $window, EventEnumerator) {
    $scope.imageUrl = 'http://placehold.it/700x300';
    $scope.$on(EventEnumerator.imgChangeSuccess, function () {
        $window.alert('Img successfully changed');
    });

    var imagesAsArray = [{
        url: '/images/bikes-400.jpg',
        width: '400'
    }, {
        url: '/images/bikes-800.jpg',
        width: '800'
    }, {
        url: '/images/bikes-1280.jpg',
        width: '1280'
    }, {
        url: '/images/bikes-2560.jpg',
        width: '2560'
    }];

    var sizes = [
        "(max-width: 320px) 400px", // media + size (px or vw)
        "(max-width: 800px) 800px",
        "(max-width: 1440px) 1280px",
        "2560px"
    ];

    $scope.image = {
        placeholder: imagesAsArray[0].url,
        fallback: 'http://placehold.it/700x300',
        images: imagesAsArray,
        sizes: sizes
    };
}]);

demoControllers.controller('filterCtrl', ['$scope', function ($scope) {

    $scope.diacriticList = ['dégagé', 'déjà vu', 'démarche', 'démodé', 'dénouement', 'Mützen', 'tête-à-tête'];
    $scope.cyrillicList = ['радиатор', 'Антарктика', 'телеграмма', 'Англия', 'витамин', 'мираж', 'Шанхай'];
    $scope.customObject = {
        name: 'Sinisa',
        company: {
            name: 'Onefootball Gmbh',
            address: 'Greifswalder strasse 212'
        },
        status: 'Awesome',
        food: ['Steak, pizza, coffee']
    };

    $scope.newLinesText = 'This is some text\n that has a line break, <br/> <br/> <br/> <br/> <br/> \n\n\n\n\n which is unusual!';

    $scope.listOfObjects = [
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
    $scope.strReplace = 'aaaaaaaAaaaaaaabbbb';

    $scope.encodeURIExample = 'https://www.google.si/maps/search/greifswalder strasse 212';

    $scope.textForUrl = 'Jose Mourinho camp "frustrated" with Manchester Utd job situation - sources';
}]);

demoControllers.controller('serviceCtrl', ['$scope', 'Guid', function ($scope, Guid) {
    $scope.generateGuid = function () {
        $scope.GUID = Guid.generate();
    };
}]);
