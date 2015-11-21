'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var launchIhu = require('launch-ihu');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');

var path = {
  js: 'src/js/*.js',
  dist: '/dist'
}


gulp.task('clean', function () {
  return del('src/bundle.js');
});



gulp.task('jshint',  function () {
  return gulp.src('src/js/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('browserify', ['clean'], function () {
  var bundler = browserify('src/js/app.js').bundle();
  bundler.pipe(source('bundle.js'))
      .pipe(gulp.dest('src/'));
});


gulp.task('deploy', function () {
  return gulp.src('src/**')
    .pipe($.sftp({
      host: '172.17.0.1',
      user: 'root',
      pass: 'root',
      timeout: 200000,
      remotePath: '/var/opt/bosch/dynamic/internet/apps/421118567'
    }));
});

gulp.task('connect', function () {
  $.connect.server({
    root: 'src',
    port: 9000,
    livereload: true
  });
});

gulp.task('build', ['clean', 'browserify', 'jshint']);
gulp.task('serve', ['jshint', 'connect'], function () {
  launchIhu();
});