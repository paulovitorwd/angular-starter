const plugins = require('gulp-load-plugins')({
    pattern : ['*'],
    scope   : ['devDependencies']
});

const sync = {
    dev   : plugins.browserSync.create(),
    doc   : plugins.browserSync.create(),
    build : plugins.browserSync.create()
};

const registers = require('./gulp.registers')(plugins, sync);
////////////////////

plugins.gulp.task('default', () => {
    console.log('=================================');
    console.log('|                                |');
    console.log('|    Use commands:               |');
    console.log('|      $ gulp compile:dev        |');
    console.log('|      $ gulp compile:build      |');
    console.log('|      $ gulp compile:prod       |');
    console.log('|      $ gulp serve:dev          |');
    console.log('|      $ gulp serve:doc          |');
    console.log('|      $ gulp serve:build        |');
    console.log('|                                |');
    console.log('=================================');
});

plugins.gulp.task('compile:dev',                        registers.compileDev);
plugins.gulp.task('compile:build', [ 'compile:dev' ],   registers.compileBuild);
plugins.gulp.task('compile:prod',  [ 'compile:build' ], registers.compileProd);
plugins.gulp.task('serve:dev',     [ 'compile:dev' ],   registers.serveDev);
plugins.gulp.task('serve:doc',     [ 'compile:dev' ],   registers.serveDoc);
plugins.gulp.task('serve:build',   [ 'compile:build' ], registers.serveBuild);