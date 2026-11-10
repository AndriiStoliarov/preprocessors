var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var browserSync = require('browser-sync').create();



var config = {
    paths: {
        less: './src/less/**/*.less',
        html: './public/index.html'
    },
    output: {
        path: './public',
        cssName: 'bundle.min.css'
    },
    isDevelop: false
};


gulp.task('less', function() {
    return gulp.src(config.paths.less)
        .pipe(gulpIf(config.isDevelop, sourcemaps.init())) // create stream
        .pipe(less()) // compile less in css
        .pipe(concat(config.output.cssName)) // merge all lessfiles into one
        .pipe(autoprefixer()) // add prefixer
        .pipe(gulpIf(!config.isDevelop, cleanCss())) // bandle minification
        .pipe(gulpIf(config.isDevelop, sourcemaps.write())) // write maps
        .pipe(gulp.dest(config.output.path)) // transfer bandle into folder
        .pipe(browserSync.stream()); // browserSync connect to stream
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.less, gulp.parallel(['less']));
    gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['less', 'serve']));