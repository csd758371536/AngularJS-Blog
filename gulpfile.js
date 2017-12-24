var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

/**
 * 定义文件路径
 */
var app = {
	srcPath: 'src/', // 源码路径
	devPath: 'build/', // 编译路径
	prdPath: 'dist/' // 发布路径
};

/**
 * 通过bower安装的库文件
 */
gulp.task('lib', function() {
	gulp.src('bower_components/**/*.js')
	.pipe(gulp.dest(app.devPath + 'vendor'))
	.pipe(gulp.dest(app.prdPath + 'vendor'))
	.pipe($.connect.reload());
});

/**
 * html文件
 */
gulp.task('html', function() {
	gulp.src(app.srcPath + '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
});

/**
 * 模拟实际请求返回的json数据
 */
gulp.task('json', function() {
	gulp.src(app.srcPath + 'data/**/*.json')
	.pipe(gulp.dest(app.devPath + 'data'))
	.pipe(gulp.dest(app.prdPath + 'data'))
	.pipe($.connect.reload());
});

/**
 * less格式的样式文件
 */
gulp.task('less', function() {
	gulp.src(app.srcPath + 'style/index.less')
	.pipe($.plumber())
	.pipe($.less())
	.pipe(gulp.dest(app.devPath + 'css'))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath + 'css'))
	.pipe($.connect.reload());
});

/**
 * js文件
 */
gulp.task('js', function() {
	gulp.src(app.srcPath + 'script/**/*.js')
	.pipe($.plumber())
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPath + 'js'))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath + 'js'))
	.pipe($.connect.reload());
});

/**
 * 图片文件
 */
gulp.task('image', function() {
	gulp.src(app.srcPath + 'image/**/*')
	.pipe($.plumber())
	.pipe(gulp.dest(app.devPath + 'image'))
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath + 'image'))
	.pipe($.connect.reload());
});

gulp.task('build', ['lib', 'html', 'json', 'less', 'js', 'image']);

gulp.task('clean', function() {
	gulp.src([app.devPath, app.prdPath])
	.pipe($.clean());
});

gulp.task('serve', ['build'], function() {
	$.connect.server({
		root: [app.devPath],
		livereload: true,
		port: 8000
	});
	open('http://localhost:8000');

	gulp.watch('bower_components/**/*', ['lib']);
	gulp.watch(app.srcPath + '**/*.html', ['html']);
	gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
	gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
	gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
	gulp.watch(app.srcPath + 'image/**/*', ['image']);
});

gulp.task('default', ['serve']);