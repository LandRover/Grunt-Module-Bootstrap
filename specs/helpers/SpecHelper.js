beforeEach(function(){
    jasmine.addMatchers({
        toBeNumber: function(){
            return {
                compare: function(actual, expected){
                    return {
                        pass: (/\d+/).test(actual)
                    };
                }
            };
        }
    });
    
    
    jasmine.addMatchers({
        toBeArray: function(){
            return {
                compare: function(actual, expected){
                    return {
                        pass: '[object Array]' === Object.prototype.toString.call(actual) ? true : false
                    };
                }
            };
        }
    });
    
    
    jasmine.addMatchers({
        toBeNaN: function (expected) {
            return {
                compare: function(actual, expected){
                    return {
                        pass: isNaN(actual)
                    };
                }
            };
        }
    });
});
