(function () {
    'use strict';
    describe ('imgChange', function () {
        var element;
        var iScope;

        beforeEach(function () {
            module ('onefootball.components.directives.imgChange');
            module ('onefootball.components.config');
        });

        beforeEach(inject(function ($rootScope, $compile) {
            var scope = $rootScope;
            scope.imageUrl = 'http://lorempixel.com/400/200/fashion/';
            element = $compile ('<img src="http://lorempixel.com/400/200/sports/" data-img-change="{{::imageUrl}}"/>') (scope);
            iScope = element.scope();
            iScope.$digest();
        }));

        it ('changes src url on load', function () {
            element.triggerHandler('load');
            expect(iScope.newImg.attr('src')).toEqual (iScope.imageUrl);
            iScope.newImg.triggerHandler('load');
            expect(element.attr('src')).toEqual (iScope.imageUrl);
            expect(element.attr('loaded')).toEqual ('true');
        });

        it ('does not change src url on error', function () {
            element.triggerHandler('load');
            iScope.newImg.triggerHandler('error');
            expect(element.attr('src')).toEqual ('http://lorempixel.com/400/200/sports/');
            expect(element.attr('loaded')).toEqual ('true');
        });

        it ('success event triggered', inject(function (EventEnumerator) {
            var successCalled = false;
            iScope.$on(EventEnumerator.imgChangeSuccess, function () {
                successCalled = true;
            });
            element.triggerHandler('load');
            iScope.newImg.triggerHandler('load');
            expect(successCalled).toBe (true);
        }));

        it ('error event triggered', inject(function (EventEnumerator) {
            var errorCalled = false;
            iScope.$on(EventEnumerator.imgChangeError, function () {
                errorCalled = true;
            });
            element.triggerHandler('load');
            iScope.newImg.triggerHandler('error');
            expect(errorCalled).toBe (true);
        }));
    });
}) ();