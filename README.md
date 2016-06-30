onefootball-angular-components
===============

[![Build Status](https://travis-ci.org/Onefootball/onefootball-angular-components.svg?branch=master)](https://travis-ci.org/Onefootball/onefootball-angular-components)
[![Coverage Status](https://coveralls.io/repos/github/Onefootball/onefootball-angular-components/badge.svg?branch=master)](https://coveralls.io/github/Onefootball/onefootball-angular-components?branch=master)

Different useful angular components (in-view, responsive image, lazy load, in viewport, filters,...), that we use in our daily development of best football platform: https://www.onefootball.com

## Demo, Code snippets, Live Example

[Checkout out demo and code snippets (usage examples) here.] (http://onefootball.github.io/onefootball-angular-components/)

## Issues and questions

If you have any issues or questions, please open a github issue.

## Usage

Package is available through bower

```
bower install onefootball-angular-components

```

usage

```xml
 <script src="bower_components/onefootball-angular-components/dist/onefootball-angular-components.min.js"> </script>
```

and add ```'onefootball.components'``` to your app dependencies.

e.g.:

```javascript
var app = angular.module('myApp', ['onefootball.components',...]);
```

Or through npm

```
npm install onefootball-angular-components

```

## Locally/Development

To run locally, just clone the repo, then

```
npm install
bower install
grunt demo

```

## Test and JSCS

```
grunt test

```

## Prefix

All components uses `of` as prefix to avoid namespace collision.

## [Services] (http://onefootball.github.io/onefootball-angular-components/#!/services)

#### [Guid] (http://onefootball.github.io/onefootball-angular-components/#!/services#ofGuid)

This service generates unique user id (GUID, UUID, UID)

Usage (you have to inject Guid service in your controller/service/factory):

```xml
function ($rootScope, ofGuid) {
    $rootScope.GUID = ofGuid.generate();
}
```

## [Directives] (http://onefootball.github.io/onefootball-angular-components/#!/directives)

#### [Image change] (http://onefootball.github.io/onefootball-angular-components/#!/directives#of-img-change)

General idea here is that we can use image placeholder, until we resolve our real url. Usually you would use
image that is cached as placeholder and then replace it with real image. This offers better user experience.
You can also subscribe to two events here, imgChange.success and imgChange.error.

Usage (works also with ngSrc):

```xml
<img src="http://lorempixel.com/400/200/sports/" of-img-change="::imageUrl" />
```

#### [Responsive image] (http://onefootball.github.io/onefootball-angular-components/#!/directives##of-responsive-image)

This directive provides a nice interface around the "srcset" attribute and accepts both a placeholder URL
and a fallback one in case an error occurs while loading the image. You can also subscribe to two events
here, imgChange.success and imgChange.error.

Usage (works also with ngSrc):

```xml
<script>
    $scope.image = {
        fallback: 'http://placehold.it/700x300',
        images: [{
            url: '/images/bikes-400.jpg',
            width: '400'
        }, {
            url: '/images/bikes-1280.jpg',
            width: '1280'
        }, {
            url: '/images/bikes-2560.jpg',
            width: '2560'
        }]
    };
</script>
<img src="/images/bikes-400.jpg" of-responsive-image="::image" />
```

#### [In view] (#### [Responsive image] (http://onefootball.github.io/onefootball-angular-components/#!/directives##of-in-view)

In view directive triggers an event when element is in viewport.

Usage (for more info look at the demo):

```xml
<div of-in-view="{{::options}}"></div>
```

## [Filters] (http://onefootball.github.io/onefootball-angular-components/#!/filters)

#### [Cyrillic to latin] (http://onefootball.github.io/onefootball-angular-components/#!/filters#ofCyrillic2latin)

This filter transliterate cyrillic to latin. We use it for generating cyrillic urls (to use ascii urls).

Usage:

```xml
<ul>
    <li ng-repeat= "item in cyrillicList">{{:: item}} ==> {{:: item | ofCyrillic2latin}}</li>
</ul>
```

#### [Diacritic strip] (http://onefootball.github.io/onefootball-angular-components/#!/filters#ofDiacriticStrip)

This filter can be used to strip accents from words. This can be useful, when you want to sort words alphabetically,
or when you want to generate url from name, title,...

```xml
<ul>
    <li ng-repeat= "item in diacriticList">{{:: item}} ==> {{:: item | ofDiacriticStrip}}</li>
</ul>
```

#### [Json pretty print] (http://onefootball.github.io/onefootball-angular-components/#!/filters#ofJsonPrettyprint)

This filter can be used to quickly pretty print JS object.

```xml
<pre>
    {{:: customObject | ofJsonPrettyprint}}
</pre>
```

#### [New lines normalize] (http://onefootball.github.io/onefootball-angular-components/#!/filters#ofNewLines)

 Often text that is served to the applications, have some strange line breaks.
        This filter, together with ngSanitize is used to normalize line breaks in chunk of text (output is html).


```xml
<div ng-bind-html="::newLinesText | ofNewLines">
```

#### [Order object by property] (http://onefootball.github.io/onefootball-angular-components/#!/filters#ofOrderObjectBy)

This filter is used to order list of objects by property.

```xml
<li ng-repeat= "item in listOfObjects | ofOrderObjectBy : 'name'">
    name: {{:: item.name}},
    id: {{:: item.id}}
</li>
```

#### [String replace] (http://onefootball.github.io/onefootball-angular-components/#!/filters#ofReplace)

This is a simple string replace filter. First argument is target to replace, second is replacement pattern and
last one (optional) are regular expression flags.


```xml
<div>{{::strReplace | ofReplace : 'a' :'c' : 'gi'}}</div>
```

#### [Encode url] (http://onefootball.github.io/onefootball-angular-components/#!/filters#ofUrlEncode)

This filter is just a wrapper for encodeURI.

```xml
<div>{{:: encodeURIExample | ofUrlEncode}}</div>
```

#### [Url safe text] (http://onefootball.github.io/onefootball-angular-components/#!/filters#ofUrlSafe)

This filter converts random text to url save text (it supports also cyrillic text). It can be used to generate slugs,
or rewrite urls.

```xml
<div>{{:: textForUrl | ofUrlSafe}}</div>
```

## Copyright and license

```
The MIT License (MIT)

Copyright (c) 2015 Onefootball

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
