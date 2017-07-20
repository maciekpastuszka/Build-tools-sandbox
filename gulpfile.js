const gulp = require('gulp');

/* JS */
const concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel');

/* JS Modules*/
const babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

/* CSS */
const sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    sassGlob = require('gulp-sass-glob'),
    gulpStylelint = require('gulp-stylelint');

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
    src = './resources/',
    dest = './public/',
    modules = './node_modules/';

gulp.task('default', function () {
    runSequence(
        ['css', 'js', 'images'], ['fonts']
    );
});

gulp.task('css-lint', function () {
    return gulp.src(src + 'css/5_components/**')
        .pipe(gulpStylelint({
            reporters: [
                {formatter: 'string', console: true}
            ]
        }).on('error', function () {
            console.log('CSS Lint failed');
        }))
});

gulp.task('css', ['css-lint'], function () {
    return gulp.src(src + 'css/main.scss')
        .pipe(sassGlob())
        .pipe(plumber({errorHandler: notify.onError({title: "CSS", message: 'Error!'})}))
        .pipe(sourcemaps.init())
        .pipe(sass({
            precision: 6
        }))
        .pipe(postcss([autoprefixer()]))
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
    gulp.src([
        src + 'js/components/*.js',
        src + 'js/main.js'
    ]).pipe(jshint())
        .pipe(jshint.reporter('default'));

    return browserify({
        entries: src + 'js/main.js',
        extensions: ['.js'], debug: true
    })
        .transform(babelify, {presets: ['es2015']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(concat('modules.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(src + 'js/temp'))
        .pipe(plumber.stop());
});

gulp.task('js-build', function () {
    return gulp.src([
        src + 'js/temp/vendor.js',
        src + 'js/temp/modules.js'
    ]).pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
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
        runSequence('css', function () {
            browserSync.reload();
        });
    });
    gulp.watch([src + 'js/*.js', src + 'js/components/*.js'], function () {
        runSequence('js-scripts', 'js-build', function () {
            browserSync.reload();
        });
    });
    gulp.watch('public/*.html').on('change', browserSync.reload);
});
