# Grunt-Module-Bootstrap

This is a quick bootstrap project which will get you up and running in no time.

I've used this structure to build few Chrome extenstions and few JS libs which will be also published later on.

## What's inside?
  - Require.JS / AMD (r.js compiling)
  - Almond
  - jQuery
  - Lo-Dash
  - SASS + Compass
  - Jasmine + PhantomJS
  - Image optimizing for both PNG and JPG

## Installing Prerequisites
  - Install nodejs
  - Install Grunt (globally)
    - npm install -g grunt-cli
    - npm install -g grunt-init
    - npm init (reads existing package.json file)
  - Install npm modules (locally)
    - run attached ./_install_grunt_prerequisites.sh
  - Run
    - grunt test
    - grunt debug
    - grunt release
    

## @todo
  - Add support for usemin
  - Split the Grunt tasks to smaller, maintainable chunks
  - split scss files to smaller units, have a scss config file to set browser and other settings
