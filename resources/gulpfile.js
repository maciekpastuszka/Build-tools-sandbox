var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');


var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var reload = browserSync.reload();

var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['css', 'js', 'images']); // ['js']

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
    gulp.src('./css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../public/css'));
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