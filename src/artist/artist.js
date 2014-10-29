/**
 * Represents a sample artist
 * @name Artist
 * @construtor Artist
 
 */
define(function() {
    'use strict';
    
    function Artist() {}
    
    Artist.prototype = {
        
        /**
         * Sets the name of the artists
         * @param {String} name of the artist
         * @return Artist
         */
        setName: function(name) {
            this.name = name;
            
            return this;
        },
        
        
        /**
         * Sets artist as featured
         * @return Artist
         */
        setFeatured: function() {
            this.isArtistFeatured = true;
            
            return this;
        },
        
        
        /**
         * Checks if artist is featured
         * @return {Boolean} True if artist is featured
         */
        isFeatured: function() {
            return (true === this.isArtistFeatured);
        }
    };
    
    return Artist;
});