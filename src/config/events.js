angular
    .module('onefootball.components.config.events', [])
    .constant('EventEnumerator',
        {
            imgChangeSuccess: 'imgChange.success',
            imgChangeError: 'imgChange.error',
            inView: 'element.inview'
        }
    );

