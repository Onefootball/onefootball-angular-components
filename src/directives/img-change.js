angular
	.module('onefootball.components.directives.imgChange', [])
	.directive('imgChange', ['EventEnumerator', imgChange]);

function imgChange(EventEnumerator) {
	return {
		restrict: 'EA',
		link: function (scope, element){
			var el = element[0];
			el.onload = function (){
				if( !el.getAttribute("img-loaded") ){
					var url = el.getAttribute("img-change") || el.getAttribute("data-img-change");
					var img = new Image();
					img.onload = function () {
						el.setAttribute("src", url);
						el.setAttribute("img-loaded", true);
						scope.$emit(EventEnumerator.imgChangeSuccess);
					};
					img.onerror = function () {
						el.setAttribute("img-loaded", true);
						scope.$emit(EventEnumerator.imgChangeError);
					};
					img.src = url;
				}
			};
		}
	};
}