module.exports = {
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
};