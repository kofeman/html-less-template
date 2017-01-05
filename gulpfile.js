var gulp = require('gulp'),
	less = require('gulp-less'),
	imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	sprite = require("gulp.spritesmith"),
	fileinclude = require('gulp-file-include'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace');

// Собираем html

gulp.task('html', function() {
	gulp.src(['src/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.pipe(replace('../images', 'images'))
		.pipe(gulp.dest('.'))
		.on('error', console.log);
});



//less

gulp.task('less', function() {
	gulp.src(['src/less/style.less'])
		.pipe(less())
		.on('error', console.log)
		.pipe(autoprefixer())
		.pipe(replace('../../images', '../images'))
		.pipe(gulp.dest('css'));
});


// Собираем JS

//gulp.task('js', function() {
//	gulp.src(['app/blocks/**/*.js'])
//		.pipe(concat('main.js'))
//		.pipe(gulp.dest('./dist/js'));
//
//});

// Копируем и минимизируем изображения

gulp.task('images', function() {

	// jpg

	gulp.src(['src/images/**/*.jpg'])
		.pipe(imagemin())
		.pipe(gulp.dest('images'));

	// png

	gulp.src(['src/images/**/*.png', '!src/images/sprite/**/*'])
		.pipe(imageminPngquant({quality: '65-80', speed: 4})())
		.pipe(gulp.dest('images'));


	// sprites

	var spriteData =
		gulp.src('images/sprite/**/*') // путь, откуда берем картинки для спрайта
		.pipe(sprite({
			imgName: 'images/sprite.png',
			cssName: '_sprite.css',
			padding: 20,
			algorithm: 'top-down',
			cssOpts: {
				cssSelector: function (sprite) {
					return '.' + sprite.name;
				}
			}
		}));

	spriteData.img.pipe(gulp.dest('.')); // путь, куда сохраняем картинку
	spriteData.css
		.pipe(gulp.dest('src/less')); // путь, куда сохраняем стили

	gulp.src(['src/less/_sprite.css'])
		.pipe(rename('_sprite.less'))
		.pipe(replace('images', '../../images'))
		.pipe(gulp.dest('src/less'));


});


// gulp watch

gulp.task('watch', function() {

	gulp.watch('src/less/**/*.less', function() {
		gulp.run('less');
	});
	gulp.watch('src/**/*.html', function() {
		gulp.run('html');
	});
	gulp.watch('app/images/*/**', function() {
		gulp.run('images');
	});
});


//default task

gulp.task('default', [ 'html', 'less', 'images', 'watch'], function() {});
