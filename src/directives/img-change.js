angular
    .module('onefootball.components.directives.imgChange', [])
    .directive('imgChange', ['EventEnumerator', imgChange]);

function imgChange(EventEnumerator) {
    return {
        restrict: 'EA',
        link: function (scope, element, attr) {
            element.bind('load', function () {
                if (!element.attr("loaded")) {
                    var url = attr.imgChange;
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
