angular
    .module('onefootball.components.directives.inView', [])
    .directive('inView', ['EventEnumerator', '$document', inView]);

function inView(EventEnumerator, $document) {
    return {
        restrict: 'EA',
        scope: {
            options: '<'
        },
        /**
         *
         * @param scope
         * @param scope.options - configuration options for in view directive
         * @param scope.keepBound - by default, when element is in view, we will not listen for it anymore
         *                          setting keepBound on true, will keep checking if element is in viewport
         * @param element
         */
        link: function (scope, element) {

            var el = element [0];
            var options = scope.options || {};
            var keepBound = options.keepBound;

            inViewHandler(el);

            $document.bind('resize scroll', inViewHandler);

            function inViewHandler() {
                if (isElementInViewport(el)) {
                    scope.$emit(EventEnumerator.inView, element);
                    if (!keepBound) {
                        $document.unbind('resize scroll', inViewHandler);
                    }
                }
            }

            //http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
            function isElementInViewport(el) {
                var rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
                );
            }
        }
    };
}
