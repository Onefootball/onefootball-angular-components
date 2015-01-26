module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
	  concat: {
	    options: {
	      separator: ';',
	      process: function(src) {
          return  '(function ( window, angular, undefined ) {\n'
          				+ src + 
            	'\n})( window, window.angular );'
          }
	    },
	    dist: {
	      src: "src/**/*.js",
	      dest: 'dist/onefootball-angular-components.js'
	    }
	  },
	  uglify: {
	    my_target: {
	      files: {
	        'dist/onefootball-angular-components.min.js': 'dist/onefootball-angular-components.js'
	      }
	    }
	  }
	});

	grunt.registerTask('default', [
	'concat',
	'uglify'
	]);
};