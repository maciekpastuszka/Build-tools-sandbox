const gulp = require('gulp');

/* JS */
const concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel');

/* CSS */
const sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    sassGlob = require('gulp-sass-glob');

/* Image */
const imagemin = require('gulp-imagemin');

/* Other */
const plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    size = require('gulp-size'),
    changed = require('gulp-changed'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    notify = require("gulp-notify");

/**
 * Project sources
 */
const domain = '',
    src = './src/',
    dest = './public/',
    modules = './node_modules/';

gulp.task('default', function () {
    runSequence(
        ['css', 'js', 'images'], ['fonts']
    );
});

gulp.task('css', function () {
    return gulp.src(src + 'css/main.scss')
        .pipe(sassGlob())
        .pipe(plumber({errorHandler: notify.onError({title: "CSS", message: 'Error!'})}))
        .pipe(sourcemaps.init())
        .pipe(sass({
            precision: 6
        }))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cssnano())
        .pipe(sourcemaps.write('/'))
        .pipe(size({title: 'Styles'}))
        .pipe(gulp.dest(dest + 'css'))
        .pipe(notify({title: "CSS", message: 'Ready!', onLast: true}))
        .pipe(plumber.stop());
});

gulp.task('js', function () {
    return runSequence('js-vendor', 'js-scripts', 'js-build', function () {
        console.log('JS finish.');
    });
});

gulp.task('js-vendor', function () {
    return gulp.src([
        src + 'js/vendor/*'
    ]).pipe(concat('vendor.js'))
        .pipe(gulp.dest(src + 'js/temp'));
});

gulp.task('js-scripts', function () {
    return gulp.src([
        src + 'js/script.js'
    ])
        .pipe(plumber({errorHandler: notify.onError({title: "JS", message: 'Error!'})}))
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({title: 'Scripts'}))
        .pipe(gulp.dest(src + 'js/temp'))
        .pipe(plumber.stop())
        .pipe(notify({title: "JS", message: 'Ready!', onLast: true}));
});

gulp.task('js-build', function () {
    return gulp.src([
        src + 'js/temp/*.js'
    ]).pipe(concat('scripts.js'))
        .pipe(gulp.dest(dest + 'js'));
});

gulp.task('images', function () {
    return gulp.src([src + 'img/**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)', '!'])
        .pipe(changed(dest + 'img/'))
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(dest + 'img'));
});

gulp.task('fonts', function () {
    return gulp.src([src + 'fonts/**/*(*.ttf|*.eot|*.woff|*.woff2)'])
        .pipe(size({title: 'Fonts'}))
        .pipe(gulp.dest(dest + 'fonts'));
});

gulp.task('sync', ['default'], function () {
    if (domain) {
        browserSync.init({
            proxy: domain,
            watchOptions: {
                debounceDelay: 1000
            }
        });
    } else {
        //Jeśli nie ma zdefiniowanej domeny odpal serwer w katalogu public
        browserSync.init({
            server: {
                baseDir: 'public',
                watchOptions: {
                    debounceDelay: 1000
                }
            }
        });
    }
    gulp.watch(src + 'css/**', function () {
        //zapobiega przeładowaniu przeglądarki przed końcem transpilacji
        runSequence('css', function () {
            browserSync.reload();
        });
    });
    gulp.watch([src + 'js/*.js'], function () {
        //zapobiega przeładowaniu przeglądarki przed końcem transpilacji
        runSequence('js-scripts', 'js-build', function () {
            browserSync.reload();
        });
    });
    gulp.watch('public/*.html').on('change', browserSync.reload);
});
