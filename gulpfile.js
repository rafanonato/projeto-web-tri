'use strict';

var addStream = require('add-stream');
var concat = require('gulp-concat');

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./config.json'),
    gulpNgConfig = require('gulp-ng-config');

function makeConfig() {
    return gulp.src('./config.json')
    .pipe(gulpNgConfig('config', {
        environment: 'development'
    }));
}

// Inicializando o Gulp
gulp.task('default', function() {
    console.log('Gulp funcionando...');
  });

  // Rodar Gulp em development Gulp development
gulp.task('development', function () {
    gulp.src(('./config.json'))
    .pipe(addStream.obj(makeConfig()))
    .pipe(gulpNgConfig('vip.config', {
        environment: 'development'
      }))
    .pipe(gulp.dest(path.join(conf.paths.src, './')))
});

  // Rodar Gulp em development Gulp development
  gulp.task('prod', function () {
    gulp.src(('./config.json'))
    .pipe(addStream.obj(makeConfig()))
    .pipe(gulpNgConfig('vip.config', {
        environment: 'production'
      }))
    .pipe(gulp.dest(path.join(conf.paths.src, './')))
});