angular
	.module('onefootball.filters.diacritic', [])
	.filter('diacriticStrip', ['DiacriticsRemoval',
		function(DiacriticsRemoval){
			return function(input){
				return DiacriticsRemoval.stripDiacritics(input);
			} 
		}]);