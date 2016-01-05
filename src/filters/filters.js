angular
    .module('onefootball.components.filters',
        ['onefootball.components.filters.diacriticStrip', 'onefootball.components.filters.cyrillic2latin',
            'onefootball.components.filters.jsonPrettyprint', 'onefootball.components.filters.newlines',
            'onefootball.components.filters.orderObjectBy', 'onefootball.components.filters.replace',
            'onefootball.components.filters.urlEncode', 'onefootball.components.filters.urlText']);