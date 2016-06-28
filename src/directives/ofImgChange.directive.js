angular
    .module('onefootball.components.directives')
    .directive('ofImgChange', ['ofEventEnumerator', ofImgChange]);

function ofImgChange(ofEventEnumerator) {
    return {
        restrict: 'EA',
        scope: {
            ofImgChange: '='
        },
        link: function (scope, element) {
            element.bind('load', function () {
                if (!element.attr("loaded")) {
                    var url = scope.ofImgChange;
                    scope.newImg = angular.element(new Image());

                    scope.newImg.bind ('load', function () {
                        element.attr("src", url);
                        element.attr("loaded", true);
                        scope.$emit(ofEventEnumerator.imgChangeSuccess, element);
                        delete scope.newImg;
                    });

                    scope.newImg.bind ('error', function () {
                        element.attr("loaded", true);
                        scope.$emit(ofEventEnumerator.imgChangeError, element);
                        delete scope.newImg;
                    });

                    scope.newImg.attr("src", url);
                }
            });
        }
    };
}
