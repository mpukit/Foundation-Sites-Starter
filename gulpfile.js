var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
// var jslint = require('gulp-jslint'); // To-do
var browserSync = require('browser-sync').create();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function () {
  return gulp.src('scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: sassPaths
    })
      .on('error', function (err) {
        console.log(err.message + ' on line ' + err.lineNumber + ' in file : ' + err.fileName);
      })
    )
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    //.pipe(concat('all.css')) // Placeholder - to-do
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

// gulp.task('default', function () {
//     return gulp.src(['source.js'])
//             .pipe(jslint())
//             .pipe(jslint.reporter('default', errorsOnly))
//             .pipe(jslint.reporter('stylish', options));
// }); // To-do

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['sass', 'browser-sync'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch("*.html").on('change', browserSync.reload); // Watch HTML
});
