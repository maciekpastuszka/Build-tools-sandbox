var gulp = require('gulp');

/* JS */
var tslint = require("gulp-tslint"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json"),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel');

/* CSS */
var sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer');

/* Image */
var imagemin = require('gulp-imagemin');

/* Icons */
var iconfont = require('gulp-iconfont');

/* Other */
var plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    size = require('gulp-size'),
    changed = require('gulp-changed'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

var domain = '',
    src = './resources/',
    dest = './public/',
    modules = './node_modules/';

gulp.task('default', function () {
    runSequence(
        ['css', 'js', 'images', 'icons'], ['fonts']
    );
});

gulp.task('css', function () {
    return gulp.src(src + 'css/main.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            precision: 6,
            onError: function (err) {
                return console.log(err);
            }
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('/'))
        .pipe(size({title: 'Styles'}))
        .pipe(gulp.dest(dest + 'css'));
});

gulp.task('js', function () {
    runSequence('ts-scripts', 'js-scripts', function () {
        console.log('JS finish.');
    });
});


gulp.task('js-lint', function () {
    return gulp.src([
        src + 'js/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js-scripts', ['js-lint'], function () {
    return gulp.src([
        // src + 'js/scripts.js',
        src + 'js/ts_temp/*.js' //compiled TS
    ])
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
            }
        }))
        .pipe(babel())
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({title: 'Scripts'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(dest + 'js'));
});

gulp.task('ts-scripts', function () {
    return gulp.src([
        src + 'js/main.ts'
    ])
        .pipe(tslint({
            configuration: "tslint.json"
        }))
        .pipe(tslint.report())
        .pipe(tsProject())
        .js.pipe(gulp.dest(src + '/js/ts_temp'));
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

gulp.task('icons', function () {
    return gulp.src(src + 'icons/*.svg')
        .pipe(iconfont({
            fontName: 'icons-font',
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            timestamp: Math.round(Date.now() / 1000)
        }))
        .on('glyphs', function (glyphs, options) {
            console.log(glyphs);
        })
        .pipe(gulp.dest(dest + 'fonts/icons'));
});

gulp.task('bs', ['default'], function () {
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

    gulp.watch([src + 'js/*.js', src + 'js/*.ts', '!' + src + 'ts_temp'], function () {
        runSequence('ts-scripts', 'js-scripts', function () {
            browserSync.reload();
        });
    });

    gulp.watch('public/*.html').on('change', browserSync.reload);
});


