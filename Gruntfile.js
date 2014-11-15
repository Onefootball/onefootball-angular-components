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
	      dest: 'dist/angular-sinisag-components.js',
	    },
	  },
	  uglify: {
	    my_target: {
	      files: {
	        'dist/angular-sinisag-components.min.js': 'dist/angular-sinisag-components.js'
	      }
	    }
	  }
	});

	

	grunt.registerTask('default', [
	'concat',
	'uglify'
	]);
}