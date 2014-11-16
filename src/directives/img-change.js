angular
	.module('sinisag.directives.imgChange', [])
	.directive('imgChange', function() {
    return {
      restrict: 'EA',
	  scope: true,
      link: function (scope, element){
	      		
	      		element[0].onload = function (){
	      			if( !element[0].getAttribute("img-loaded") ){
			  			var url = element[0].getAttribute("change-url");
			  			var img = new Image();
			  			img.onload = function () {
			  				element[0].setAttribute("img-loaded", true);
			  				element[0].setAttribute("src", url);
			  			};
			  			img.onerror = function () {
			  				element[0].setAttribute("img-loaded", true);
			  			};
			  			img.src = url;
					}
	      		};
        	}
  	};
});