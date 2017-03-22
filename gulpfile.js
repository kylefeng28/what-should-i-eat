const gulp = require('gulp');
const util = require('gulp-util');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const webserver = require('gulp-server-livereload');

var paths = {
	'pug': [ 'views/*.pug' ],
	'babel': [ 'scripts/*.es6' ]
}

gulp.task('pug', function() {
	util.log('Compiling pug in ' + paths.pug + '...');
	return gulp.src(paths.pug)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('public'));
});

gulp.task('babel', function() {
	util.log('Compiling babel in ' + paths.babel + '...');
	return gulp.src(paths.babel)
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('public'));
});

gulp.task('watch', [ 'pug', 'babel' ], function() {
	gulp.watch(paths.pug, ['pug']);
	gulp.watch(paths.babel, ['babel']);
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
