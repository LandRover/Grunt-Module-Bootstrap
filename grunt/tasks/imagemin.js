module.exports = {
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
};