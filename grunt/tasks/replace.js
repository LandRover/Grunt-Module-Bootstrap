module.exports = {
    release: {
        src: '<%= build.release %>/index.html',
        overwrite: true,
        replacements: [{
            from: 'src/main',
            to: '<%= pkg.name %>.min'
        }]
    }
};