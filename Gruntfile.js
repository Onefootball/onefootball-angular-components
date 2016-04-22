module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        concat: {
            dist: {
                options: {
                    separator: ';',
                    process: function (src) {
                        return '(function ( window, angular, undefined ) {\n'
                            + src +
                            '\n})( window, window.angular );'
                    }
                },
                src: "src/**/*.js",
                dest: 'dist/onefootball-angular-components.min.js'
            },
            demo: {
                src: [
                    "bower_components/angular/angular.js",
                    "bower_components/angular-sanitize/angular-sanitize.js",
                    "bower_components/angular-route/angular-route.js",
                    "bower_components/angular-gist/angular-gist.js",
                    "demo/scripts/src/**/*.js"
                ],
                dest: 'demo/scripts/dist/all.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/onefootball-angular-components.min.js': 'dist/onefootball-angular-components.min.js'
                }
            },
            demo: {
                files: {
                    'demo/scripts/dist/all.js': 'demo/scripts/dist/all.js'
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
                dest: 'demo/scripts/src',
                cwd: 'dist/',
                expand: true
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },
        coveralls: {
            options: {
                debug: true,
                coverageDir: 'coverage',
                dryRun: false,
                force: false,
                recursive: true
            }
        }
    });

    grunt.registerTask('build', [
        'concat:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('demo', [
        'build',
        'copy:demo',
        'concat:demo',
        'uglify:demo',
        'connect:demo'
    ]);

    grunt.registerTask ('test', ['karma:unit']);
};