var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions'], {cascade: true}))
	/*.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))*/
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});
gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
})
gulp.task('css-libs', ['sass'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
})

gulp.task('browserSync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		inerlaced: true,
		progressive: true,
		svgoPlugins: [{removeBiewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'))
})

gulp.task('clean', function(){
	return del.sync('dist');
});
gulp.task('clear', function(){
	return cache.clearAll();
});

gulp.task('watch', ['browserSync', 'css-libs', 'scripts'], function(){
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){
	var buildCss = gulp.src('app/css/*.css')
	.pipe(gulp.dest('dist/css'));
	
	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
	
	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));
	
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});

/*



//плагін
gulp.task('mytask',function(){
	return gulp.src('sourse-files')
	.pipe(plugin())
	.pipe(gulp.dest('folder'))
});

путь *.sass  в

*/