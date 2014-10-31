module.exports = {
    release: {
        src: '<%= build.release %>/index.html',
        overwrite: true,
        replacements: [{
            from: 'data-main="src/main" src="vendors/require/require.min.js"',
            to: 'src="Grunt-Module-Bootstrap.min.js"'
        }]
    }
};