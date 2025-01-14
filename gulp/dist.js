import gulp from 'gulp';
import concat from 'gulp-concat';
import ngAnnotate from 'gulp-ng-annotate';
import uglify from 'gulp-uglify';
import del from 'del';
import runSequence from 'run-sequence';
import rev from 'gulp-rev-append';
import minifyCss from 'gulp-minify-css';

gulp.task('dist:rev', () => {
  return gulp.src('dist/index.html')
    .pipe(rev())
    .pipe(gulp.dest('dist'));
});

// build creates bundle.js
gulp.task('dist:bundle', () => {
  return gulp.src([
      '.tmp/*.js'
    ])
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:style', () => {
	return gulp.src([
			'.tmp/*.css'
		])
		.pipe(minifyCss())
		.pipe(gulp.dest('dist'));
});

gulp.task('dist:app', () => {
	return gulp.src([
		  	'src/index.html',
		  	'.tmp/*/**',
		  	'.tmp/*.map'
	    ])
	    .pipe(gulp.dest('dist'));
});

gulp.task('dist:img', () => {
	return gulp.src([
			'src/img/*.*'
		])
		.pipe(gulp.dest('dist/img'));
});

gulp.task('dist:specs', () => {
	return gulp.src([
			'src/app/**/*spec.js'
		])
	.pipe(gulp.dest('dist/specs'));
});

gulp.task('dist:mocks', () => {
	return gulp.src([
			'tests/**/*.*'
		])
		.pipe(gulp.dest('dist/tests'));
});

gulp.task('dist:prepare', () => {
	return del(['dist', '.tmp']);
});

gulp.task('dist:concat', () => { 
	return gulp.src([
		'.tmp/bundle.js',
		'./src/app/app.production.config.js'
		])
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest('.tmp'));
});

gulp.task('dist:assets', () => {
	return gulp.src([
		'gulp/dist-assets/**/*',
		'bower_components/angular-mocks/angular-mocks.js'
		])
	.pipe(gulp.dest('dist'));
});

gulp.task('dist',['dist:concat'], () => {
		return runSequence([
			'dist:bundle', 
			'dist:style', 
			'dist:img',
			'dist:app',
			'dist:specs',
			'dist:mocks',
			'dist:assets'
		]);
});