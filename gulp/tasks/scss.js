module.exports = function (plugins, sync) {
    return function () {
        plugins.gulp.src('./dev/app/**/*.{css,map}', { read : false })
            .pipe(plugins.rimraf({ force : true }));

        return plugins.gulp.src('./dev/app/**/*.scss')
            .pipe(plugins.compass({
                sass      : './dev/app/',
                css       : './dev/app/',
                image     : './dev/assets/images/app',
                font      : './dev/assets/fonts',
                relative  : true,
                comments  : true,
                sourcemap : true,
                style     : 'expanded'
            }))
            .on('error', () => process.exit(1))
            .pipe(plugins.gulp.dest('./dev/app/'))
            .pipe(sync.dev.stream());
    };
};
