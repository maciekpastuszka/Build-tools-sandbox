var gulp = require('gulp');

//css
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

//js
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

//other
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var reload = browserSync.reload();
var runSequence = require('run-sequence');

var sourcemaps = require('gulp-sourcemaps');


var config = {
    resources: 'resources'
};

gulp.task('default', function(callback) {
    runSequence(
        'css',
        'js',
        'images',
        callback
    );
});

gulp.task('js', function () {
    return gulp.src(config.resources + '/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify({
            outSourceMap: true
        }))
        .pipe(sourcemaps.write())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('images', function () {
    return gulp.src(config.resources + '/images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('public/images'));
});

gulp.task('css', function () {
    var stream = gulp.src(config.resources + '/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
    return stream;
});

gulp.task('sync', ['css', 'js'], function () {
    /*  browserSync.init({
     proxy: 'localhost'
     }); */
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });
    gulp.watch(config.resources + '/css/**', ['css']);
    gulp.watch(config.resources + '/css/**').on('change', browserSync.reload);
    gulp.watch(config.resources + '/js/**', ['js']);
    gulp.watch(config.resources + '/js/**').on('change', browserSync.reload);
    gulp.watch('public/*').on('change', browserSync.reload);
});