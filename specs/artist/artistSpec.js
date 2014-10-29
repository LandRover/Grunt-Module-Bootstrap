define([
    'artist/artist'
], function(Artist) {
    'use strict';
    
    describe('Artist Init', function() {
        it('it can create an Artist', function() {
            var artist = new Artist();
            artist.setName('Bob Dylan');
            
            expect(artist.name).toBe('Bob Dylan');
        });
        
        it('it can set Artist as featured', function() {
            var artist = new Artist();
            artist.setName('Bob Dylan').setFeatured();
            
            
            expect(artist.isFeatured()).toBe(true);
        });
    });


});