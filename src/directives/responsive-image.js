angular
    .module('onefootball.components.directives.responsiveImage', [])
    .directive('responsiveImage', ['EventEnumerator', '$rootScope', responsiveImage]);

/**
 * Use: '<img responsive-image="image" />'
 *
 * See the description of the linking function for details about `image`.
 *
 * See also https://developer.mozilla.org/en-US/Learn/HTML/Multimedia_and_embedding/Responsive_images and
 * http://www.webdesignerdepot.com/2015/08/the-state-of-responsive-images/
 */
function responsiveImage(EventEnumerator, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            responsiveImage: '<'
        },
        link: linkFn
    };

    /**
     * @param scope
     * @param element
     * @param {object}              scope.responsiveImage
     * @param {string}              scope.responsiveImage.fallback Will be used `src` in case of an error while loading
     *  the appropriate image.
     * @param {string}              scope.responsiveImage.placeholder Will be set as a temporary `src` in case the
     *  attribute is not already present.
     * @param {string|array|object} scope.responsiveImage.images The items in the array are expected to have a `url`
     *  property and either a `width` or a `density` one. In case of an object, each of the properties `s`, `m`, and  `l`
     *  is respectfully associated to the densities `1x`, `2x`, `3x`.
     * @param {string|array}        scope.responsiveImage.sizes Optional list of sizes to match to the elements in the
     * `images` array.
     * @params {boolean}            scope.lazyLoad will load images only when they are in viewport
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset
     */
    function linkFn(scope, element) {

        scope.ONE_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        scope.DEFAULT_SIZE = "(min-aspect-ratio: 4/5) 80vh";

        var lazyLoadListener;
        var _options = scope.responsiveImage;
        _options.fallback = _options.fallback || scope.ONE_PIXEL;
        _options.placeholder = _options.placeholder || scope.ONE_PIXEL;
        _options.sizes = _options.sizes || scope.DEFAULT_SIZE;

        if (!element.attr('src')) {
            // first we add a placeholder if needed
            element.attr('src', _options.placeholder);
        }

        if (_options.lazyLoad) {
            lazyLoadListener = $rootScope.$on(EventEnumerator.inView, function (event, el) {
                if (el === element) {
                    handleImage();
                }
            });
            scope.$on('$destroy', function () {
                lazyLoadListener();
            });
        } else {
            handleImage();
        }

        function handleImage() {
            // then we try to load the right image in the background
            scope.fakeImage = angular.element(new Image());
            scope.fakeImage.bind("load", function (event) {
                element.attr('srcset', scope.fakeImage.attr('srcset'));
                delete scope.fakeImage;
                scope.$emit(EventEnumerator.imgChangeSuccess, {src: getSrcFromEvent(event)});
            });

            scope.fakeImage.bind("error", function () {
                element.attr('src', _options.fallback);
                delete scope.fakeImage;
                scope.$emit(EventEnumerator.imgChangeError);
            });

            if (_options.sizes) {
                var sizes = unserializeSizes(_options.sizes);
                scope.fakeImage.attr('sizes', sizes);
                element.attr('sizes', sizes);
            }

            if (_options.images) {
                var srcset = unserializeImages(_options.images);
                scope.fakeImage.attr('srcset', srcset);
            } else {
                element.attr('src', _options.fallback);
            }
        }

        function getSrcFromEvent(event) {
            var imgSrc;
            if (event && event.path && event.path.length && event.path[0].currentSrc) {
                imgSrc = event.path[0].currentSrc;
            } else if (event && event.target && event.target.currentSrc) {
                imgSrc = event.target.currentSrc;
            }
            return imgSrc;
        }
    }

    function unserializeImages(images) {
        var srcset = '';
        if (typeof images === 'string' || images instanceof String) {
            srcset = images;
        } else if (Array.isArray(images)) {
            // unserialize array
            for (var i = 0; i < images.length; i++) {
                var s = ' ' + images[i].url;
                if (images[i].width) {
                    s += ' ' + images[i].width + 'w';
                } else if (images[i].density) {
                    s += ' ' + images[i].density + 'x';
                }
                srcset += s + ',';
            }
        } else {
            srcset += images.s && images.s + ' 1x,';
            srcset += images.m && images.m + ' 2x,';
            srcset += images.l && images.l + ' 3x,';
        }
        return srcset.trim().slice(0, -1);
    }

    function unserializeSizes(sizes) {
        var _sizes = '';
        if (typeof sizes === 'string' || sizes instanceof String) {
            _sizes = sizes;
        } else if (Array.isArray(sizes)) {
            _sizes += sizes.join(', ');
        }
        return _sizes;
    }
}
