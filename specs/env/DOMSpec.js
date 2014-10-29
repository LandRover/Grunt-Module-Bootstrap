describe('DOM', function(){
    beforeEach(function(){
        jQuery('body').append('<div id="js-add">A DOM node inserted</div>');
    });
    
    afterEach(function(){
        jQuery('#js-add').remove();
    });

    it('should insert some fixture data into the SpecRunner', function(){
        expect(document.getElementById('js-add').innerHTML).toBe('A DOM node inserted');
    });
});

describe('DOM el not found', function(){
    it('should remove verify tearDown executed correctly', function(){
        expect(document.getElementById('js-add')).toBeNull();
    });
});