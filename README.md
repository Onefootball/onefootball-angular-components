angular-sinisag-components
===============

Various useful angular components

## Installation instructions

Open your ```bower.package``` and add the following

```
 "dependencies": {
   "angular-sinisag-components":"git@github.com:SinisaG/angular-sinisag-components.git#master"
 }
```

then run 

``` $ bower install ```

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

It's a filter that takes in a string and changes all letters with accents with ther not accented substitutes ('dégagé' ==> 'defage', 'Mützen' => Mutzen). 

Original js code - [lehelk] (http://web.archive.org/web/20120918093154/http://lehelk.com/2011/05/06/script-to-remove-diacritics/).

Usage:

```html

<ul>
	<li ng-repeat= "item in ['dégagé', 'déjà vu', 'démarche', 'démodé', 'dénouement', 'Mützen']">{{item}} ==> {{item | diacriticStrip}}</li>
</ul>

``` 
One of the best use case for this is when we want alphabetically sort array of accented strings.