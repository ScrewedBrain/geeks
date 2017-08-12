'use strict';

var gulp = require('gulp');
var minify = require('gulp-minify');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 

 
gulp.task('compress', function() {
  gulp.src('./lib/**/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('watch:scss', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);

});

gulp.task('watch:js', function () {
  gulp.watch('./lib/**/*.js', ['compress']);
});

gulp.task('watch:all', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./lib/**/*.js', ['compress']);
});