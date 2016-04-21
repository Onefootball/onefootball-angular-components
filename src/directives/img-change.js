angular
    .module('onefootball.components.directives.imgChange', [])
    .directive('imgChange', ['EventEnumerator', imgChange]);

function imgChange(EventEnumerator) {
    return {
        restrict: 'EA',
        scope: {
            imgChange: '='
        },
        link: function (scope, element) {
            element.bind('load', function () {
                if (!element.attr("loaded")) {
                    var url = scope.imgChange;
                    scope.newImg = angular.element(new Image());

                    scope.newImg.bind ('load', function () {
                        element.attr("src", url);
                        element.attr("loaded", true);
                        scope.$emit(EventEnumerator.imgChangeSuccess);
                        delete scope.newImg;
                    });

                    scope.newImg.bind ('error', function () {
                        element.attr("loaded", true);
                        scope.$emit(EventEnumerator.imgChangeError);
                        delete scope.newImg;
                    });

                    scope.newImg.attr("src", url);
                }
            });
        }
    };
}
