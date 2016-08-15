/* Gulp task runner for SASS processing and Javascript processing */

// IMPORTS
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

// GLOBALS
var jsDest = 'src/js';
var cssDest = 'assets/css'
var npmJSFiles = 'node_modules'

var jsFiles = [
    'bootstrap-sass/assets/javascripts/bootstrap.js',
    'jquery/dist/jquery.js'
    ];

// Append the bower directory
jsFiles = jsFiles.map(function(obj){
    return npmJSFiles + '/' + obj;
});

/**
 * Process the CSS
 */
gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.scss')
            .pipe(sass({
                includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
                })
              .on('error', sass.logError))
            .pipe(gulp.dest(cssDest))
            //.pipe(rename({suffix: '.min'}))
            //.pipe(minifycss())
            //.pipe(gulp.dest(destFolder + 'stylesheets'));
});

/**
 * Process the JS
 */
gulp.task('jsMove', function() {

    return gulp.src(jsFiles)
        .pipe(gulp.dest(jsDest));

    // return gulp.src(jsFiles)
    //     .pipe(gulp.dest(destFolder + 'js'))
    //     .pipe(rename({suffix: '.min'}))
    //     .pipe(jsmin())
    //     .pipe(gulp.dest(destFolder + 'js'));
});

/**
 * Bundle the JS
 */
 gulp.task('browserify', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('assets/js'))
});

/**
 * Default task
 */
gulp.task('default', ['styles', 'jsMove', 'browserify'], function() {
    gulp.watch('src/sass/**/*.scss',['styles']);
    //gulp.watch('node_modules/**/*.js', ['jsProcess']);
    gulp.watch('src/js/**/*.js', ['browserify']);
});
