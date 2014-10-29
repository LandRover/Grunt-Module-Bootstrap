module.exports = function (grunt) {
    /*
    Install Grunt:
    -------------------
        npm install -g grunt-cli
        npm install -g grunt-init
        npm init (reads existing package.json file)
    
    Install Grunt Prerequisites:
    ---------------------
        ./_install_grunt_prerequisites.sh
    
    Gem Prerequisites:
    -----------------
        gem install sass
        gem install compass
        gem install image_optim
    */
    
    // Print the execution time for the tasks
    require('time-grunt')(grunt);
    
    // NPM tasks
    require('load-grunt-tasks')(grunt, [
        'grunt-*',
        '!grunt-template-jasmine-istanbul',
        '!grunt-template-jasmine-requirejs'
    ]);
    
    // Grunt init
    grunt.initConfig({
        
        // Package data parsed
        pkg: grunt.file.readJSON('package.json'),
        
        build: {
            src: './src',
            release: './.release'
        },
        
        // Connect webserver, used to test DOM elements via Jasmine / PhantomJS
        connect: {
            server: {
                options: {
                    // Port to listen on
                    port: 1337
                }
            }
        },
        
        jasmine: {
             // run tests
            run: {
                src: [
                    '<%= build.src %>/**/*.js'
                ],
                options: {
                    host: 'http://127.0.0.1:1337/',
                    specs: [
                        'specs/**/*.js'
                    ],
                    helpers: [
                        'specs/helpers/*Helper.js',
                        'vendors/sinon/sinon.js'
                    ],
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: '<%= build.src %>/',
                            mainConfigFile: '<%= build.src %>/main.js'
                        }
                    }
                }
            },
            
            // code coverage
            istanbul: {
                src: [
                    '<%= build.src %>/**/*.js'
                ],
                options: {
                    specs: [
                        'specs/**/*Spec.js'
                    ],
                    helpers: [
                        'specs/helpers/*Helper.js',
                        'vendors/sinon/sinon.js'
                    ],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'bin/coverage/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: {
                                    dir: 'bin/coverage/html'
                                }
                            },
                            {
                                type: 'text-summary'
                            }
                        ],
                        replace: false, // disable src replacing with template by instrumented sources
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfig: {
                                baseUrl: '<%= build.src %>/', // source base url.
                                config: {
                                    // grunt.config.get() is being evaluated at this point is unavailable
                                    // paths of sources being instrumented, should be same as jasmine
                                    instrumented: {
                                        src: grunt.file.expand('<%= build.src %>/*.js')
                                    }
                                },
                                // Callback to read the paths of the sources being instrumented
                                // Redirects requests to the proper locations
                                // @todo: clean code
                                callback: function () {
                                    define('instrumented', ['module'], function (module) {
                                        return module.config().src;
                                    });
                                    
                                    require(['instrumented'], function (instrumented) {
                                        var oldLoad = requirejs.load;
                                        requirejs.load = function (context, moduleName, url) {
                                            // normalize paths
                                            if ('./' === url.substring(0, 2)) {
                                                url = url.substring(2);
                                            } else
                                            if ('/' === url.substring(0, 1)) {
                                                url = url.substring(1);
                                            }
                                            
                                            // redirect
                                            if (-1 < instrumented.indexOf(url)) {
                                                url = './.grunt/grunt-contrib-jasmine/' + url;
                                            }
                                            
                                            return oldLoad.apply(this, [context, moduleName, url]);
                                        };
                                    });
                                }
                            }
                        }
                    }
                }
            }
        },
        
        jshint: {
            files: [
                '<%= build.src %>/**/*.js',
                'specs/**/*Spec.js',
                'Gruntfile.js'
            ],
            
            options: {
                boss: true,
                browser: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                
                globals: {
                    // Env
                    console: true,
                    
                    // Require / AMD
                    define: true,
                    module: true,
                    require: true,
                    requirejs: true,
                    
                    // jQuery
                    $: true,
                    jQuery: true,
                    
                    // Unit testing
                    afterEach: true,
                    beforeEach: true,
                    describe: true,
                    expect: true,
                    it: true,
                    sinon: true
                }
            }
        },
        
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= build.src %>', // all modules are loaded relativly to this path.
                    fileExclusionRegExp: /^\.|release|node_modules|Gruntfile|\.md|package.json/,
                    findNestedDependencies: true,
                    include: 'main', // this is the trick for almond. Other files to include along with almond.
                    mainConfigFile: '<%= build.src %>/main.js', // main app config file
                    name: '../vendors/almond/almond', // path is relative to baseUrl. Targets 'name' AMD shim as the main module
                    optimize: 'none', // compression level
                    out: '<%= build.release %>/<%= pkg.name %>.min.js', // output compiled here
                    
                    //Wrapping code, to avoid anyone accessing from the lobal scope.
                    wrap: {
                        start: "(function(global, define) {"+
                               "  var globalDefine = global.define;", // verifies amd is on the global scope
                        
                        end:   "  var src = require('main');"+
                               "  if(typeof module !== 'undefined' && module.exports) {"+
                               "    module.exports = src;"+ // exports src from node
                               "  } else if(globalDefine) {"+
                               "    (function (define) {"+ // define src for AMD that already exists
                               "      define(function () { return src; });"+
                               "    }(globalDefine));"+
                               "  } else {"+
                               "    global['main'] = src;"+ // wire src to global after done
                               "  }"+
                               "}(this));"
                    }
                }
            }
        },
        
        
        compass: {
            dev: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css',
                    relativeAssets: true,
                    force: true,
                    assetCacheBuster: true,
                    outputStyle: 'nested'
                }
            },
            
            release: {
                options: {
                    sassDir: 'sass',
                    cssDir: '<%= build.release %>/css',
                    relativeAssets: true,
                    force: true,
                    outputStyle: 'compressed',
                    environment: 'production'
                }
            }
        },
        
        imagemin: {
            png: {
                options: {
                    // Can only be set on PNG. JPG is not supported.
                    optimizationLevel: 7
                },
                
                files: [
                    {
                        cwd: 'images',
                        dest: '<%= build.release %>/images',
                        expand: true,
                        ext: '.png',
                        src: [
                            '**/*.png'
                        ]
                    }
                ]
            },
            
            jpg: {
                options: {
                    progressive: true
                },
                
                files: [
                    {
                        cwd: 'images',
                        dest: '<%= build.release %>/images',
                        expand: true,
                        ext: '.jpg',
                        src: [
                            '**/*.jpg'
                        ]
                    }
                ]
            }
        },
        
        htmlmin: {
            release: {
                files: {
                    '<%= build.release %>/index.html': './index.html' // dest : src
                },
                
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true
                }
            }
        },
        
        // To enable 'watch' type `grunt watch`
        watch: {
            // watch js files and run jshint
            scripts: {
                files: [
                    '<%= jshint.files %>',
                    '<%= jasmine.run.options.specs %>'
                ],
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
            },
            
            // watch sass files and compile them for dev
            compass: {
                files: ['<%= build.src %>/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:dev'],
                options: {
                    spawn: false
                }
            }
        },
        
        
        uglify: {
            release: {
                files: {
                    '<%= build.release %>/<%= pkg.name %>.min.js': '<%= build.release %>/<%= pkg.name %>.min.js' // dest : src (overrides the same file!))
                }
            },
            
            options: {
                sourceMap: false,
                banner: '/*! <%= pkg.name %>: version <%= pkg.version %>\n' +
                    '* Built on: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '* Author: <%= pkg.author %>\n' +
                    '* <%= pkg.description %>\n' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> */',
            }
        },
        
        replace: {
            release: {
                src: '<%= build.release %>/index.html',
                overwrite: true,
                replacements: [{
                    from: 'src/main',
                    to: '<%= pkg.name %>.min'
                }]
            }  
        },
        
        
        copy: {
            release: {
                expand: true,
                src: ['vendors/require/*'],
                dest: '<%= build.release %>/',
                filter: 'isFile'
            }
        }
    });

    // Default task
    grunt.registerTask('default', ['jshint', 'connect', 'jasmine', 'compass:dev']);
    
    // Unit testing task
    grunt.registerTask('test', ['connect', 'jasmine:run']);
    
    // Debug build task
    grunt.registerTask('debug', ['jshint', 'test', 'requirejs', 'compass:dev', 'imagemin', 'htmlmin', 'copy', 'replace:release']);
    
    // Release task
    grunt.registerTask('release', ['jshint', 'test', 'requirejs', 'compass:release', 'imagemin', 'htmlmin', 'uglify', 'copy', 'replace:release']);
};