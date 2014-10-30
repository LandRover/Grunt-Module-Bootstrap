module.exports = {
    // clean after build
    after_build: {
        src: [
            '.sass-cache'
        ]
    },
    
    // delete only
    release: {
        src: [
            '.sass-cache',
            '.release'
        ]
    },
    
    // deletes everything generated
    all: {
        src: [
            '.sass-cache', // clean up sass cache
            '.release', // clean build
            'css' // clean generated css
        ]
    }
};