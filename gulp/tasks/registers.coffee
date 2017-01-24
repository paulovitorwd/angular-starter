gulp      = require 'gulp'
sequence  = require 'run-sequence'
directory = require 'require-dir'

paths = require('./../settings/paths').paths
sync  = require('./../settings/sync').sync

directory './'
#====================

registers =
    configStart : (done) -> sequence 'start', done

    compileDev  : (done) -> sequence 'cache', 'doc', 'scss', done
    compileDist : (done) -> sequence 'clear', 'copy', 'htmlmin-partials', 'htmlmin-index', 'deploy-dist', done
    compileProd : (done) -> sequence 'deploy-prod', done

    serveDev : (done) ->
        sync.dev.init paths.server.dev, done

        gulp.watch paths.html_files, [ 'cache' ]
        gulp.watch paths.js_files,   [ 'doc' ]
        gulp.watch paths.scss_files, [ 'scss' ]
        gulp.watch [
            paths.dev_folder + paths.index_file,
            paths.assets_files,
            paths.app_files,
            '!' + paths.css_files
        ]
        .on 'change', sync.dev.reload

    serveDoc : (done) ->
        sync.doc.init paths.server.doc, done

        gulp.watch paths.js_files, [ 'doc' ]
        gulp.watch paths.doc_files
            .on 'change', sync.doc.reload

    serveDist : (done) -> sync.dist.init paths.server.dist, done

exports.registers = registers
