module.exports = {
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
};