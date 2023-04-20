const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const purgecss = require('gulp-purgecss');

gulp.task('clean', function () {
    return gulp.src(['./css/*.css', '!./css/normalize.css', './js/*.min.js'], {read: false})
        .pipe(clean())
});

gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
});

gulp.task('concat', function() {
    return gulp.src('./css/*.css')
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./css'))
});

gulp.task('purge', function () {
    return gulp.src('./css/*.css')
    .pipe(purgecss({
        content: ['./**/*.html']
    }))
    .pipe(gulp.dest('./css'))
});

gulp.task('postCss', function () {
    return gulp.src('./css/*.css')
    .pipe(purgecss({
        content: ['./**/*.html']
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css'))
});

gulp.task('uglify', function () {
    return gulp.src('./js/*.js')
          .pipe(uglify())
          .pipe(rename('script.min.js'))
          .pipe(gulp.dest('./js'))
});

gulp.task('imagesMin', function() {
    return gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./img'))
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('browserSync', function() {
    return browserSync.init({
        server: { baseDir: './' },
        files: ['*.html']
    });
});

// Sledování změn v souborech
gulp.watch('./sass/**/*.scss').on('change', function(path, stats) {
    console.log(`CSS File ${path} was changed`);
});
gulp.watch('./js/*.js').on('change', function(path, stats) {
    console.log(`JS File ${path} was changed`);
});

gulp.watch('./sass/**/*.scss', gulp.series('clean', 'sass', 'concat', 'reload'));
gulp.watch('./js/*.js', gulp.series('reload'));

// Vývojový mód
gulp.task('default', gulp.series('clean', 'sass', 'concat', 'browserSync'));

// Produkční mód
gulp.task('prod', gulp.series('clean', 'sass', 'concat', 'postCss', 'uglify', 'imagesMin', 'browserSync'));