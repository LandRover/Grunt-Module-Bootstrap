describe('General', function(){
    it('should verify array - empty / basic test', function(){
        expect([]).toBeArray();
    });

    it('verify AMD module loaded jQuery', function(){
        expect(jQuery).toBeDefined();
    });
});