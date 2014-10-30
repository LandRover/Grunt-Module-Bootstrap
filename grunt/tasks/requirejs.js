module.exports = {
    compile: {
        options: {
            baseUrl: '<%= build.src %>', // all modules are loaded relativly to this path.
            fileExclusionRegExp: /^\.|release|node_modules|Gruntfile|\.md|package.json/,
            findNestedDependencies: true,
            include: 'main', // this is the trick for almond. Other files to include along with almond.
            mainConfigFile: '<%= build.src %>/main.js', // main app config file
            name: '../vendors/almond/almond', // path is relative to baseUrl. Targets 'name' AMD shim as the main module
            optimize: 'none', // compression level
            out: '<%= build.release %>/<%= pkg.name %>.min.js', // output compiled here
            
            //Wrapping code, to avoid anyone accessing from the lobal scope.
            wrap: {
                start: "(function(global, define) {"+
                       "  var globalDefine = global.define;", // verifies amd is on the global scope
                
                end:   "  var src = require('main');"+
                       "  if(typeof module !== 'undefined' && module.exports) {"+
                       "    module.exports = src;"+ // exports src from node
                       "  } else if(globalDefine) {"+
                       "    (function (define) {"+ // define src for AMD that already exists
                       "      define(function () { return src; });"+
                       "    }(globalDefine));"+
                       "  } else {"+
                       "    global['main'] = src;"+ // wire src to global after done
                       "  }"+
                       "}(this));"
            }
        }
    }
};