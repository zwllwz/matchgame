var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var del = require('del');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');


gulp.task('lint',  function () {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));//install jshint-stylish as a dependency
});


var config = {
  entryFile: './src/js/app.js',
  outputDir: './dist/',
  outputFile: 'app.js'
};

gulp.task('clean', function () {
  return del(config.outputDir);
});

function map_error(error) {
  console.log("Error: " + error.message);
}

function bundle_js(bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir));
}

gulp.task('browserify', function () {
  var bundler = browserify(config.entryFile, {debug: true}).transform(babelify);

  return bundle_js(bundler);
});


gulp.task('watchify', ['clean'], function () {
  var args = _.extend({debug: true}, watchify.args);
  var bundler = watchify(browserify(config.entryFile, args)).transform(babelify);

  bundle_js(bundler);

  bundler.on('update', function () {
    bundle_js(bundler);
  })
});


// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});
