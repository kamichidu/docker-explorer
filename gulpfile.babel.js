import gulp from 'gulp';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel.js';
import sass from 'gulp-sass';
import path from 'path';

gulp.task('build:static', () => {
    gulp.src(path.join(__dirname, 'src', 'main', 'static', '**', '*'))
        .pipe(gulp.dest(path.join(__dirname, 'docs')));
});
gulp.task('build:vendor', () => {
    gulp.src(path.join(__dirname, 'node_modules', 'sanitize.css', 'sanitize.css'))
        .pipe(gulp.dest(path.join(__dirname, 'docs', 'vendor', 'css')));
});
gulp.task('build:css', () => {
    gulp.src(path.join(__dirname, 'src', 'main', 'css', '**', '*'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(__dirname, 'docs', 'assets', 'css')));
});
gulp.task('build:js', () => {
    gulp.src(path.join(__dirname, 'src', 'main', 'js', '**', '*'))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(path.join(__dirname, 'docs', 'assets', 'js')))
    ;
});
gulp.task('build', ['build:static', 'build:css', 'build:js', 'build:vendor']);

gulp.task('watch', ['build:static', 'build:css', 'build:vendor'], () => {
    gulp.watch(path.join(__dirname, 'src', 'main', 'static', '**', '*'), ['build:static']);
    gulp.watch(path.join(__dirname, 'src', 'main', 'css', '**', '*'), ['build:css']);
    // jsはwebpack側でwatchする
});

gulp.task('default', ['build']);
