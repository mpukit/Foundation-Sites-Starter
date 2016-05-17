var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var jslint = require('gulp-jslint');
var browserSync = require('browser-sync').create();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function () {
  return gulp.src('scss/*.scss')
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
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('css', function () {
  return gulp.src(['css/*.css'])
    .pipe(concatCss("bundle.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function () {
  return gulp.src(['./js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('production.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js/dist'));
});

gulp.task('lint', function () {
    return gulp.src(['./js/*.js'])
            .pipe(jslint())
            // .pipe(jslint.reporter('default', errorsOnly)) // Default Reporter
            // .pipe(jslint.reporter('stylish', options)); // Stylish Reporter
            .pipe(jslint.reporter('stylish')); // Basic setup using 'Stylish'
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['sass', 'css', 'lint', 'scripts', 'browser-sync'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch('*.html', 'css/*.css').on('change', browserSync.reload); // Watch HTML/CSS
});
