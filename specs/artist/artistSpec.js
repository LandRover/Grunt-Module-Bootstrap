define([
    'artist/artist'
], function(Artist) {
    'use strict';
    
    var artist;
    
    beforeEach(function() {
        artist = new Artist();
    });
    
    
    describe('Artist Init', function() {
        it('it can create an Artist', function() {
            artist.setName('Bob Dylan');
            
            expect(artist.name).toBe('Bob Dylan');
        });
        
        it('it can set Artist as featured', function() {
            artist.setName('Bob Dylan').setFeatured();
            
            
            expect(artist.isFeatured()).toBe(true);
        });
    });


});