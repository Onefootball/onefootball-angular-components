(function () {
    'use strict';

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

    var fallbackUrl = 'http://placehold.it/700x300';

    beforeEach(function () {
        module ('onefootball.components.directives.responsiveImage');
        module ('onefootball.components.config');
    });

    describe ('responsiveImage with no src set', function () {
        var element;
        var iScope;
        beforeEach(inject(function ($rootScope, $compile) {

            var scope = $rootScope;
            scope.image = {
                placeholder: imagesAsArray[0].url,
                fallback: fallbackUrl,
                images: imagesAsArray,
                sizes: sizes
            };
            element = $compile ('<img responsive-image="::image" />') (scope);
            iScope = element.isolateScope();
            iScope.$digest();
        }));

        it ('placeholder is set as src ', function () {
            expect(element.attr('src')).toEqual (imagesAsArray[0].url);
        });

        it ('success event triggered and srcset is set correctly and fake image is deleted from scope', inject(function (EventEnumerator) {
            var successCalled = false;
            iScope.$on(EventEnumerator.imgChangeSuccess, function () {
                successCalled = true;
            });
            iScope.fakeImage.triggerHandler('load');
            expect(successCalled).toBe (true);
            expect(element.attr('sizes')).toEqual('(max-width: 320px) 400px, (max-width: 800px) 800px, (max-width: 1440px) 1280px, 2560px');
            expect(element.attr('srcset')).toBe ('/images/bikes-400.jpg 400w, /images/bikes-800.jpg 800w, /images/bikes-1280.jpg 1280w, /images/bikes-2560.jpg 2560w');
            expect(iScope.fakeImage).toBeUndefined();
        }));

        it ('error event triggered, src set correctly and fakeImage is deleted from scope', inject(function (EventEnumerator) {
            var errorCalled = false;
            iScope.$on(EventEnumerator.imgChangeError, function () {
                errorCalled = true;
            });
            iScope.fakeImage.triggerHandler('error');
            expect(errorCalled).toBe (true);
            expect(element.attr('sizes')).toEqual('(max-width: 320px) 400px, (max-width: 800px) 800px, (max-width: 1440px) 1280px, 2560px');
            expect(element.attr('srcset')).toBeUndefined();
            expect(element.attr('src')).toEqual(fallbackUrl);
            expect(iScope.fakeImage).toBeUndefined();
        }));
    });

    describe ('responsiveImage with src set', function () {
        var element;
        var iScope;
        var src = "http://placehold.it/500x500";
        beforeEach(inject(function ($rootScope, $compile) {

            var scope = $rootScope;
            scope.image = {
                placeholder: imagesAsArray[0].url,
                fallback: fallbackUrl,
                images: imagesAsArray,
                sizes: sizes
            };
            element = $compile ('<img src=:url responsive-image="::image" />'.replace(':url', src)) (scope);
            iScope = element.isolateScope();
            iScope.$digest();
        }));

        it ('placeholder is ignored when src is set', function () {
            expect(element.attr('src')).toEqual (src);
        });
    });

    describe ('responsiveImage works without fallback and placeholder', function () {
        var element;
        var iScope;
        beforeEach(inject(function ($rootScope, $compile) {

            var scope = $rootScope;
            scope.image = {
                images: imagesAsArray,
                sizes: sizes
            };
            element = $compile ('<img responsive-image="::image" />') (scope);
            iScope = element.isolateScope();
            iScope.$digest();
        }));

        it ('src is set to 1 px', function () {
            expect(element.attr('src')).toEqual (iScope.ONE_PIXEL);
        });

        it ('success event triggered and srcset set correctly', function () {
            iScope.fakeImage.triggerHandler('load');
            expect(element.attr('sizes')).toEqual('(max-width: 320px) 400px, (max-width: 800px) 800px, (max-width: 1440px) 1280px, 2560px');
            expect(element.attr('srcset')).toBe ('/images/bikes-400.jpg 400w, /images/bikes-800.jpg 800w, /images/bikes-1280.jpg 1280w, /images/bikes-2560.jpg 2560w');
        });

        it ('on error, we set src to 1 px', function () {
            iScope.fakeImage.triggerHandler('error');
            expect(element.attr('src')).toEqual (iScope.ONE_PIXEL);
        });
    });

    describe ('responsiveImage with images as objects and no sizes (default size is set)', function () {
        var element;
        var iScope;
        beforeEach(inject(function ($rootScope, $compile) {

            var scope = $rootScope;
            scope.image = {
                placeholder: imagesAsArray[0].url,
                fallback: fallbackUrl,
                images: {
                    s: 'http://placehold.it/100x100',
                    m: 'http://placehold.it/500x500',
                    l: 'http://placehold.it/1000x1000'
                }
            };
            element = $compile ('<img responsive-image="::image" />') (scope);
            iScope = element.isolateScope();
            iScope.$digest();
        }));

        it ('sizes are set to default value', function () {
            expect(element.attr('sizes')).toEqual (iScope.DEFAULT_SIZE);
        });

        it ('srcset is set correctly on load success', function () {
            iScope.fakeImage.triggerHandler('load');
            expect(element.attr('srcset')).toEqual ('http://placehold.it/100x100 1x,http://placehold.it/500x500 2x,http://placehold.it/1000x1000 3x');
        });
    });

    describe ('responsiveImage with images as objects and sizes', function () {
        var element;
        var iScope;
        beforeEach(inject(function ($rootScope, $compile) {

            var scope = $rootScope;
            scope.image = {
                placeholder: imagesAsArray[0].url,
                fallback: fallbackUrl,
                images: {
                    s: 'http://placehold.it/100x100',
                    m: 'http://placehold.it/500x500',
                    l: 'http://placehold.it/1000x1000'
                },
                sizes: sizes
            };
            element = $compile ('<img responsive-image="::image" />') (scope);
            iScope = element.isolateScope();
            iScope.$digest();
        }));

        it ('srcset and sizes are set', function () {
            iScope.fakeImage.triggerHandler('load');
            expect(element.attr('srcset')).toEqual ('http://placehold.it/100x100 1x,http://placehold.it/500x500 2x,http://placehold.it/1000x1000 3x');
            expect(element.attr('sizes')).toEqual('(max-width: 320px) 400px, (max-width: 800px) 800px, (max-width: 1440px) 1280px, 2560px');
        });
    });


    describe ('responsiveImage width density instead of width', function () {
        var element;
        var iScope;
        beforeEach(inject(function ($rootScope, $compile) {

            var imagesAsArrayDensity = [{
                url: '/images/bikes-400.jpg',
                density: '1'
            }, {
                url: '/images/bikes-800.jpg',
                density: '2'
            }, {
                url: '/images/bikes-1280.jpg',
                density: '3'
            }, {
                url: '/images/bikes-2560.jpg',
                density: '4'
            }];

            var scope = $rootScope;
            scope.image = {
                images: imagesAsArrayDensity
            };
            element = $compile ('<img responsive-image="::image" />') (scope);
            iScope = element.isolateScope();
            iScope.$digest();
        }));

        it ('success event triggered and srcset set correctly', function () {
            iScope.fakeImage.triggerHandler('load');
            expect(element.attr('sizes')).toEqual(iScope.DEFAULT_SIZE);
            expect(element.attr('srcset')).toBe ('/images/bikes-400.jpg 1x, /images/bikes-800.jpg 2x, /images/bikes-1280.jpg 3x, /images/bikes-2560.jpg 4x');
        });

        it ('on error, we set src to 1 px', function () {
            iScope.fakeImage.triggerHandler('error');
            expect(element.attr('src')).toEqual (iScope.ONE_PIXEL);
        });
    });

    describe ('responsiveImage minimum representation', function () {
        var element;
        var iScope;
        beforeEach(inject(function ($rootScope, $compile) {

            var scope = $rootScope;
            scope.image = {
                images: {
                    s: 'http://placehold.it/100x100',
                    m: 'http://placehold.it/500x500',
                    l: 'http://placehold.it/1000x1000'
                }
            };
            element = $compile ('<img responsive-image="::image" />') (scope);
            iScope = element.isolateScope();
            iScope.$digest();
        }));

        it ('srcset and sizes are set', function () {
            iScope.fakeImage.triggerHandler('load');
            expect(element.attr('srcset')).toEqual ('http://placehold.it/100x100 1x,http://placehold.it/500x500 2x,http://placehold.it/1000x1000 3x');
        });
    });

    describe ('responsiveImage works with lazy load', function () {
        var element;
        var iScope;
        beforeEach(inject(function ($rootScope, $compile) {

            var scope = $rootScope.$new();
            scope.image = {
                images: {
                    s: 'http://placehold.it/100x100',
                    m: 'http://placehold.it/500x500',
                    l: 'http://placehold.it/1000x1000'
                },
                lazyLoad: true
            };
            element = $compile ('<img responsive-image="::image" />') (scope);
            iScope = element.isolateScope();
            iScope.$digest();
        }));

        it ('lazy load is handled correctlu', inject(function (EventEnumerator) {
            iScope.$emit(EventEnumerator.inView, element);
            iScope.fakeImage.triggerHandler('load');
            expect(element.attr('srcset')).toEqual ('http://placehold.it/100x100 1x,http://placehold.it/500x500 2x,http://placehold.it/1000x1000 3x');
        }));
    });

}) ();