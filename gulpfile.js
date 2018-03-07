'use strict';

var addStream = require('add-stream');
var concat = require('gulp-concat');
var b2v = require('buffer-to-vinyl');

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./config.json'),
    gulpNgConfig = require('gulp-ng-config');

function makeConfig() {
    var json = JSON.stringify('./config.json')
    return gulp.src('./config.json')
    .pipe(gulpNgConfig('app.config', {
        environment: 'dsv'
    }))}

// Inicializando o Gulp
gulp.task('default', function() {
    console.log('Gulp funcionando...');
  });

// Rodar Gulp em development Gulp development
gulp.task('dsv', function () {
    gulp.src(('./config.json')).on('error', function(e){
        console.log(e)
    })
    .pipe(addStream.obj(makeConfig()))
    .pipe(gulpNgConfig('app.config', {
        environment: 'dsv'
      }))
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./build'))
});

// Rodar Gulp em development Gulp development
gulp.task('prd', function () {
    gulp.src(('./config.json')).on('error', function(e){
        console.log(e)
    })
    .pipe(addStream.obj(makeConfig()))
    .pipe(gulpNgConfig('app.config', {
        environment: 'prd'
      }))
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./build'))
});

