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
const sourcemaps = require('gulp-sourcemaps'),
    size = require('gulp-size'),
    changed = require('gulp-changed'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    args = require('yargs').argv,
    gulpif = require('gulp-if');


/**
 * Project sources
 */
const domain = '',
    src = './resources/',
    dest = './public/',
    modules = './node_modules/';

const isProduction = args.env === 'production';
const isDevelopment = args.env === 'development';
console.log('ENV: ' + args.env);


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
        .pipe(gulpif(isDevelopment, sourcemaps.init()))
        .pipe(sass({
            precision: 6
        }))
        .on('error', function (err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(postcss([autoprefixer()]))
        .pipe(gulpif(isProduction, cssnano()))
        .pipe(gulpif(isDevelopment, sourcemaps.write('/')))
        .pipe(gulp.dest(dest + 'css'));
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

gulp.task('js-hint', function () {
    gulp.src([
        src + 'js/components/*.js',
        src + 'js/main.js'
    ]).pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js-scripts', ['js-hint'], function () {
    return browserify({
        entries: src + 'js/main.js',
        extensions: ['.js'], debug: true
    })
        .transform(babelify, {presets: ['es2015']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulpif(isDevelopment, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(concat('modules.js'))
        .pipe(gulpif(isDevelopment, sourcemaps.write('./')))
        .pipe(gulp.dest(src + 'js/temp'));
});

gulp.task('js-build', function () {
    return gulp.src([
        src + 'js/temp/vendor.js',
        src + 'js/temp/modules.js'
    ]).pipe(gulpif(isDevelopment, sourcemaps.init({loadMaps: true})))
        .pipe(concat('scripts.js'))
        .pipe(gulpif(isDevelopment, sourcemaps.write()))
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
    gulp.watch([src + 'js/*.js', src + 'js/components/**/*.js'], function () {
        runSequence('js-scripts', 'js-build', function () {
            browserSync.reload();
        });
    });
    gulp.watch('public/*.html').on('change', browserSync.reload);
});
