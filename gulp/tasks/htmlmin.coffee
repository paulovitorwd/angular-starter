gulp    = require 'gulp'
useref  = require 'gulp-useref'
gulpif  = require 'gulp-if'
htmlmin = require 'gulp-htmlmin'
cssnano = require 'gulp-cssnano'
uglify  = require 'gulp-uglify'

paths = require('./../settings/paths.coffee').paths
#====================

gulp.task 'htmlmin-partials', ->
    gulp.src paths.html_files
        .pipe useref()
        .pipe gulpif '*.html', htmlmin(
            removeComments     : true
            collapseWhitespace : true
        )
        .pipe gulp.dest paths.app_folder


gulp.task 'htmlmin-index', ->
    gulp.src paths.dev_folder + paths.index_file
        .pipe useref()
        .pipe gulpif '*.css', cssnano()
        .pipe gulpif '*.js', uglify()
        .pipe gulpif '*.html', htmlmin(
            minifyJS           : true
            removeComments     : true
            collapseWhitespace : true
        )
        .pipe gulp.dest paths.dist_folder
