angular
    .module('onefootball.components.directives.responsiveImage', [])
    .directive('responsiveImage', ['EventEnumerator', responsiveImage]);

/**
 * Use: '<img responsive-image="{{ image }}" />'
 *
 * See the description of the linking function for details about `image`.
 *
 * See also https://developer.mozilla.org/en-US/Learn/HTML/Multimedia_and_embedding/Responsive_images and
 * http://www.webdesignerdepot.com/2015/08/the-state-of-responsive-images/
 */
function responsiveImage(EventEnumerator) {
    var ONE_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    return {
        restrict: 'A',
        scope: {},
        link: linkFn
    };

    /**
     * @param scope
     * @param element
     * @param {object}              attrs.responsiveImage
     * @param {string}              attrs.responsiveImage.fallback Will be used `src` in case of an error while loading
     *  the appropriate image.
     * @param {string}              attrs.responsiveImage.placeholder Will be set as a temporary `src` in case the
     *  attribute is not already present.
     * @param {string|array|object} attrs.responsiveImage.images The items in the array are expected to have a `url`
     *  property and either a `width` or a `density` one. In case of an object, each of the properties `s`, `m`, and  `l`
     *  is respectfully associated to the densities `1x`, `2x`, `3x`.
     * @param {string|array}        attrs.responsiveImage.sizes Optional list of sizes to match to the elements in the
     * `images` array.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset
     */
    function linkFn(scope, element, attrs) {
        scope.$watch(attrs.responsiveImage, function (options) {
            var _options;
            _options = options;
            _options.fallback = _options.fallback || ONE_PIXEL;
            _options.placeholder = _options.placeholder || ONE_PIXEL;
            _options.sizes = _options.sizes || "(min-aspect-ratio: 4/5) 80vh";

            var el = element[0];
            if (!el.getAttribute('src')) {
                // first we add a placeholder if needed
                el.setAttribute('src', _options.placeholder);
            }
            el.onload = onElementLoad;

            // then we try to load the right image in the background
            var fakeImage = new Image();
            fakeImage.onload = function (event) {
                el.setAttribute('srcset', fakeImage.getAttribute('srcset'));
            };
            fakeImage.onerror = function () {
                el.setAttribute('src', _options.fallback);
                scope.$emit(EventEnumerator.imgChangeError);
            };

            if (_options.sizes) {
                var sizes = unserializeSizes(_options.sizes);
                fakeImage.setAttribute('sizes', sizes);
                el.setAttribute('sizes', sizes);
            }

            if (_options.images) {
                var srcset = unserializeImages(_options.images);
                fakeImage.setAttribute('srcset', srcset);
            }
        });

        function onElementLoad(event) {
            var imgSrc;
            if (event && event.path && event.path.length && event.path[0].currentSrc) {
                imgSrc = event.path[0].currentSrc;
            } else if (event && event.target && event.target.currentSrc) {
                imgSrc = event.target.currentSrc;
            }
            scope.$emit(EventEnumerator.imgChangeSuccess, {src: imgSrc});
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
        return srcset;
    }

    function unserializeSizes(sizes) {
        var _sizes = '';
        if (typeof sizes === 'string' || sizes instanceof String) {
            _sizes = sizes;
        } else if (Array.isArray(sizes)) {
            for (var i = 0; i < sizes.length; i++) {
                _sizes += sizes[i] + ',';
            }
        }
        return _sizes;
    }
}
