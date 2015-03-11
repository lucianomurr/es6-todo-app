var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var browserSync = require('browser-sync');
 
gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', ['lint','browser-sync'], function(){

  gulp.watch('.(/src/**/*.js', [browserSync.reload]);

});