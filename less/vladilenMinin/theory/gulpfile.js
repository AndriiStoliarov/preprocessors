// 1. less -> css
// 2. create bundle
// 3. autoprefixer
// 4. sourcmaps
// 5. clean css (uglify)
// 6. life reloading

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

var config = {
    paths: {
        less: './src/less/**/*.less',
        html: './public/*.html'
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public'
    }
};

gulp.task('less', function() {
    return gulp.src(config.paths.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
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