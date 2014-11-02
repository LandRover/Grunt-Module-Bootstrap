module.exports = function (grunt) {
    /*
    Install Grunt:
    -------------------
        npm install -g grunt-cli grunt-init
        npm init (reads existing package.json file)
    
    Install Grunt Prerequisites:
    ---------------------
        npm install
    
    Gem Prerequisites:
    -----------------
        gem install sass
        gem install compass
        gem install image_optim
    */
    
    // Print the execution time for the tasks
    require('time-grunt')(grunt);
    
    var loadConfig = require('load-grunt-config'),
        pkg = grunt.file.readJSON('package.json'); 
    
    loadConfig(grunt, {
        configPath: __dirname + '/grunt/tasks',
        config: {
            pkg: pkg,
            
            build: {
                src: './src',
                release: './.release',
                banner: require('fs').readFileSync(__dirname + '/grunt/banner.txt', 'utf8')
            }
        }
    });
    
    // load grunt folder tasks.
    grunt.loadTasks('grunt');
    
    // Unit testing task
    grunt.registerTask('test', [
        'connect',
        'jasmine:run'
    ]);
    
    // Default task
    grunt.registerTask('default', [
        'jshint:src',
        'test',
        'compass:dev',
        'clean:after_build'
    ]);
    
    // Debug build task
    grunt.registerTask('debug', [
        'jshint:src',
        'test',
        'requirejs',
        'compass:dev',
        'imagemin',
        'htmlmin',
        'replace:release',
        'clean:after_build'
    ]);
    
    // Release task
    grunt.registerTask('release', [
        'jshint:src',
        'test',
        'requirejs',
        'compass:release',
        'imagemin',
        'htmlmin',
        'uglify',
        'replace:release',
        'clean:after_build'
    ]);
};