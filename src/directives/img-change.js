angular
	.module('onefootball.components.directives.imgChange', [])
	.directive('imgChange', imgChange);

function imgChange() {
	return {
		restrict: 'EA',
		link: function (scope, element){
			var el = element[0];
			el.onload = function (){
				if( !el.getAttribute("img-loaded") ){
					var url = el.getAttribute("img-change") || el.getAttribute("data-img-change");
					var img = new Image();
					img.onload = function () {
						el.setAttribute("img-loaded", true);
						el.setAttribute("src", url);
					};
					img.onerror = function () {
						el.setAttribute("img-loaded", true);
					};
					img.src = url;
				}
			};
		}
	};
}