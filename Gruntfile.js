module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
                process: function (src) {
                    return '(function ( window, angular, undefined ) {\n'
                        + src +
                        '\n})( window, window.angular );'
                }
            },
            dist: {
                src: "src/**/*.js",
                dest: 'dist/onefootball-angular-components.min.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/onefootball-angular-components.min.js': 'dist/onefootball-angular-components.min.js'
                }
            }
        },
        connect: {
            demo: {
                options: {
                    port: 9000,
                    base: {
                        path: 'demo'
                    },
                    open: true,
                    keepalive: true
                }
            }
        },
        copy: {
            demo: {
                src: '*',
                dest: 'demo/scripts',
                cwd: 'dist/',
                expand: true
            }
        }
    });

    grunt.registerTask('build', [
        'concat',
        'uglify'
    ]);

    grunt.registerTask('demo', [
        'build',
        'copy:demo',
        'connect:demo'
    ]);
};