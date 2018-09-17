var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    sourceMaps = require('gulp-sourcemaps'),
    amdOptimize = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    rename = require("gulp-rename"),
    util = require('../utils'),
     fs = require('fs');


var src = [util.src +  "**/*.js"];

var dest = util.dest;

var requireConfig = {
    baseUrl: util.src,
    out : util.pkg.name + "-all.js",
    packages : [{
       name : "skylark-langx" ,
       location :  util.lib_langx+"uncompressed/skylark-langx"
    },
    {
       name : "skylark-utils" ,
       location :  util.lib_utils+"uncompressed/skylark-utils"
    },
    {
       name : "skylark-utils-interact" ,
       location :  util.lib_utils_interact+"uncompressed/skylark-utils-interact"
    },
    {
       name : "skylark-fuelux" ,
       location :  util.lib_ui_fuelux+"uncompressed/skylark-fuelux"
    },
    {
       name : "skylark-ui-repeater" ,
       location :  util.lib_ui_repeater+"uncompressed/skylark-ui-repeater"
    },
    {
       name : util.pkg.name ,
       location :  util.src,
       main : "main"

    }],

    include: [
        util.pkg.name + "/main"
    ],
    exclude: [
    ]
};


module.exports = function() {
    return amdOptimize(requireConfig)
        .on("error",gutil.log)
        .pipe(sourceMaps.init())
        .pipe(header(fs.readFileSync(util.allinoneHeader, 'utf8')))
        .pipe(footer(fs.readFileSync(util.allinoneFooter, 'utf8')))
        .pipe(uglify())
        .on("error",gutil.log)
        .pipe(header(util.banner, {
            pkg: util.pkg
        })) 
        .pipe(sourceMaps.write("sourcemaps"))
        .pipe(gulp.dest(dest));

};
