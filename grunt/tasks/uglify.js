module.exports = {
    release: {
        files: {
            '<%= build.release %>/<%= pkg.name %>.min.js': '<%= build.release %>/<%= pkg.name %>.min.js' // dest : src (overrides the same file!))
        }
    },
    
    options: {
        sourceMap: false,
        banner: '<%= build.banner %>'
    }
};