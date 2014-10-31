require.config({
    paths: {
        jquery: '../vendors/jquery/jquery',
        lodash: '../vendors/lodash/lodash',
        dcl: '../node_modules/dcl'
    },
    
    shim: {
        lodash: {
            exports: '_'
        }
    },
    
    // Require.js plugins
    text: '../vendors/require/plugins/text',
    
    // dev cache purging
    urlArgs: 'bust=' + (new Date()).getTime()
});

require(['artist/artist','lodash', 'jquery'], function (Artist, _, jQuery) {
    console.log(Artist);
    console.log(_);
    console.log(jQuery);
});