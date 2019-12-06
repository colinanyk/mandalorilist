'use strict';
import gulp from 'gulp';
import babel from 'gulp-babel';
import print from 'gulp-print';
import yarn from 'gulp-yarn';
import clean from 'gulp-clean';
import nodemon from 'gulp-nodemon';
import eslint from 'gulp-eslint';
import faker from 'faker';
import moment from 'moment';
import dotenv from 'gulp-dotenv';

/*
Gulp tasks that install and add required packages, libraries, and environmental variables
 */

// gulp.task('lib', function () {
//     return gulp.src([
//         'node_modules/systemjs/dist/system.js',
//         'node_modules/babel-polyfill/dist/polyfill.js'])
//         .pipe(print())
//         .pipe(gulp.dest('dist/server/libs'));
// });

gulp.task('yarn', function () {
    return gulp.src(['./package.json'])
        .pipe(print())
        .pipe(yarn());
});

gulp.task('env:dev', function () {
    return gulp.src('.env')
        .pipe(dotenv())
        .pipe(print())
        .pipe(gulp.dest('dist/server'));
});


/*
Gulp tasks to build and place build into the dist directory
 */

gulp.task('build:server', ['env:dev'], function () {
    return gulp.src('src/**/*.js')
        .pipe(print())
        .pipe(babel())
        .pipe(gulp.dest('dist/server'));
});

gulp.task('watch:server', ['build:server'], function () {
    return nodemon({
        script: 'dist/server/app.js',
        watch: 'src',
        tasks: ['build:server'],
    });
});

/*
Gulp task to delete the dist directory
 */

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean())
        .pipe(print());
});