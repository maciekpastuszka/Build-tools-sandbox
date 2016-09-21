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

/*----config ---*/
var APP_SRC = 'public';

var JS_SRC = './pre/js/*.js';
var JS_SRC_CONCAT = './pre/js/concat/*.js';
var JS_DEST = 'public/js';

var IMG_SRC = 'pre/img/*';
var IMG_DEST = 'public/img';

var CSS_SRC = './pre/css/*';
var CSS_DEST = 'public/css';


var SASS_SRC = './pre/scss';
var SASS_DEST = 'pre/css';

/*----config ---*/

gulp.task('default', ['sass', 'uglify', 'concat']);

gulp.task('concat', function () {
    return gulp.src(JS_SRC_CONCAT)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(JS_DEST));
});

gulp.task('uglify', function () {
    return gulp.src(JS_SRC)
        .pipe(uglify())
        .pipe(gulp.dest(JS_DEST));
});

gulp.task('compress-images', function () {
    return gulp.src(IMG_SRC)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(IMG_DEST));
});

gulp.task('minify-css', function () {
    return gulp.src(CSS_SRC)
        .pipe(minifyCSS({
            keepSpecialComments: 1
        }))
        .pipe(gulp.dest(CSS_DEST));
});

gulp.task('sass', function () {
    gulp.src(SASS_SRC + '/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(SASS_DEST))
        .pipe(minifyCSS())
        .pipe(gulp.dest(CSS_DEST));
});


gulp.task('sync', ['sass', 'uglify', 'concat'], function () {
    //browserSync.init({
    //    server: {
    //        baseDir: "./" + APP_SRC
    //    }
    //});

    browserSync.init({
        proxy: ""
    });

    gulp.watch(SASS_SRC + "/**", ['sass']);
    gulp.watch(SASS_SRC + "/**").on('change', browserSync.reload);
    gulp.watch(JS_SRC, ['uglify']);
    gulp.watch(JS_SRC).on('change', browserSync.reload);
    gulp.watch(JS_SRC_CONCAT, ['concat']);
    gulp.watch(JS_SRC_CONCAT).on('change', browserSync.reload);
    gulp.watch("./" + APP_SRC + "/*").on('change', browserSync.reload);

});