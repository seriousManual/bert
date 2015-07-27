var gulp = require('gulp');
var rimraf = require('rimraf');
var browserify = require('gulp-browserify');
var sequence = require('run-sequence');
var gutil = require('gulp-util');

var SOURCE_DIR = 'src';
var BUILD_TARGET_DIR = 'build';

gulp.task('clean', function (callback) {
    rimraf(BUILD_TARGET_DIR, callback);
});

////////////////////////////////////////////////////// script //////////////////////////////////////////////////

gulp.task('scripts', function () {
    return gulp
        .src(SOURCE_DIR + '/bert.js')
        .pipe(browserify({standalone: 'bert'})).on('error', gutil.log)
        .pipe(gulp.dest(BUILD_TARGET_DIR));
});

////////////////////////////////////////////////////// manage //////////////////////////////////////////////////

gulp.task('dev', function (callback) {
    build(function () {
        gulp.watch(SOURCE_DIR + '/**/*.js', ['scripts']);

        callback();
    });
});

gulp.task('build', function (callback) {
    build(callback);
});

function build (callback) {
    sequence('clean', 'scripts', callback);
}