'use strict';

var public_dir = '.';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var rename = require("gulp-rename");

gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(public_dir + '/assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('pug', function() {
  gulp
    .src(['./src/pug/**/*.pug', '!./src/pug/include/**/*.pug', '!./src/pug/tpl/**/*.pug', '!./src/pug/src/sections/**/*.pug']).pipe(
    pug({
      pretty: true,
      data: require('./src/pug/data.js'),
    })).pipe(
    rename({
      extname: ".html"
    })).pipe(
    gulp.dest(public_dir));
});

gulp.task('default', ['pug', 'sass']);