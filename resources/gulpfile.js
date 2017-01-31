var gulp = require('gulp');

//css
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

//js
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

//other
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var reload = browserSync.reload();
var runSequence = require('run-sequence');

var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function(callback) {
    runSequence(
        'css',
        'js',
        'images',
        callback
    );
});

gulp.task('js', function () {
    return gulp.src('./js/*.js')
        .pipe(uglify({
            outSourceMap: true
        }))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('../public/js'));
});

gulp.task('images', function () {
    return gulp.src('./img/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('../public/img'));
});

gulp.task('css', function () {
    var stream = gulp.src('./css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../public/css'));
    return stream;
});

gulp.task('sync', ['css', 'js'], function () {
    /*  browserSync.init({
     proxy: 'localhost'
     }); */
    browserSync.init({
        server: {
            baseDir: '../public'
        }
    });
    gulp.watch('./css/**', ['css']);
    gulp.watch('./css/**').on('change', browserSync.reload);
    gulp.watch('./js/**', ['js']);
    gulp.watch('./js/**').on('change', browserSync.reload);
    gulp.watch('../public/*').on('change', browserSync.reload);
});