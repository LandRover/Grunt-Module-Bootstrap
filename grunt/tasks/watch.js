module.exports = {
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
};