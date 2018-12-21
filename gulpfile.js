var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
    gulp.src(['app/src/**/*.js'])
        //.pipe(browserify())
        .pipe(concat('M6A1.js'))
        .pipe(gulp.dest('dist/src'))
        .pipe(refresh(server))
        .pipe(browserSync.stream());
})

gulp.task('styles', function() {
    gulp.src(['app/css/**/*.css'])
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(refresh(server))
        .pipe(browserSync.stream());
})

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if (err) return console.log(err);
    });
})

gulp.task('html', function() {
    gulp.src("app/*.html")
        .pipe(embedlr())
        .pipe(gulp.dest('dist/'))
        .pipe(refresh(server))
        .pipe(browserSync.stream());
})
gulp.task('browser:serve', (done) => {
    browserSync.init({
        server: 'dist'
    });
    done();
});

gulp.task('browser:reload', (done) => {
    browserSync.reload({ stream: true });
    done();
})

gulp.task('default', function() {
    gulp.run('lr-server', 'scripts', 'styles', 'html', 'browser:serve');

    gulp.watch('app/src/**', function(event) {
        gulp.run('scripts');
    }, 'browser:reload')

    gulp.watch('app/css/**', function(event) {
        gulp.run('styles');
    }, 'browser:reload')

    gulp.watch('app/**/*.html', function(event) {
        gulp.run('html');
    }, 'browser:reload')
})