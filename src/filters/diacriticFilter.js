angular
	.module('sinisag.filters.diacritic', [])
	.filter('diacriticStrip', ['DiacriticsRemoval',
		function(DiacriticsRemoval){
			return function(input){
				var map = DiacriticsRemoval.getList();
				for(var i=0; i<map.length; i++) {
					input = input.replace(map[i].letters, map[i].base);
				}
				return input;
			} 
		}]);