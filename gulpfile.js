const gulp = require('gulp');
const util = require('gulp-util');
const pug = require('gulp-pug');
const webserver = require('gulp-server-livereload');

var paths = {
	'pug': [ 'views/*.pug' ]
}

gulp.task('pug', function() {
	util.log('Compiling index.pug...');
	return gulp.src(paths.pug)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('public'));
});

gulp.task('watch', [ 'pug' ], function() {
	gulp.watch(paths.pug, ['pug']);
});

gulp.task('dev', [ 'watch' ], function() {
/*
	gulp.src('.')
		.pipe(webserver({
			port: 8080,
			livereload: true
		}));
*/
})

gulp.task('default', [ 'dev' ]);
