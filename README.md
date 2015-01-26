onefootball-angular-components
===============

Various useful angular components

## Installation instructions

Open your ```bower.package``` and add the following

```
 "dependencies": {
   "onefootball-angular-components":"git@github.com:motain/onefootball-angular-components.git#master"
 }
```

then run 

``` $ bower install ```

and add ```'onefootball.components'``` to your app dependencies.

## Directives

#### imgChange

Directive used on image tags.

Usage:

```html
<img src="http://placekitten.com/g/200/300" img-change change-url="http://placekitten.com/g/200/400"/>

``` 

This directive will first load default(fallback img), usually served from us. Then it will try to fetch image from change-url. If it fails, it will keep a default image. If fetching changeUrl was successfull it will replace the default image.

## Filters 

#### diacriticStrip

It's a filter that takes in a string and changes all letters with accents with their not accented substitutes ('dégagé' ==> 'defage', 'Mützen' => Mutzen).

Original js code - [lehelk] (http://web.archive.org/web/20120918093154/http://lehelk.com/2011/05/06/script-to-remove-diacritics/).

Usage:

```html

<ul>
	<li ng-repeat= "item in ['dégagé', 'déjà vu', 'démarche', 'démodé', 'dénouement', 'Mützen']">{{item}} ==> {{item | diacriticStrip}}</li>
</ul>

``` 
One of the best use case for this is when we want alphabetically sort array of accented strings.

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