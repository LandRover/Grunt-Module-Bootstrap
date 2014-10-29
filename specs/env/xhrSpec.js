describe('XHR', function(){
    beforeEach(function(){
        var self = this;
        this.requests = [];
        
        // setup ajax
        this.ajax = sinon.useFakeXMLHttpRequest(); // replaces the native with fake object via sinon
        this.ajax.onCreate = function(xhr) {
            self.requests.push(xhr);
        };
    });
    
    afterEach(function(){
        // Restore original object
        this.ajax.restore();
    });

    it('should use Sinon mock', function(){
        var spy = sinon.spy();

        jQuery.ajax({
            url: '/Gruntfile.js',
            success: spy
        });
        
        this.requests[0].respond(200, {
                'Content-Type': 'application/json'
            },
            '[{"id": 1337, "foo": "bar"}]'
        );

        expect(this.requests.length).toBeNumber();
        expect(this.requests.length).toBe(1);
        expect(this.requests[0].url).toEqual('/Gruntfile.js');
        expect(this.requests[0].method).toEqual('GET');
        
        expect(spy.called).toBeTruthy();
        expect(spy.callCount).toBe(1);
        expect(spy.calledWith([{
            id: 1337, foo: "bar"
            }
        ])).toBeTruthy();
    });
});