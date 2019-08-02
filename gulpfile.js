var gulp      = require('gulp'), // Подключаем Gulp
    less       = require('gulp-less'), //Подключаем less пакет,
    browserSync = require('browser-sync'); // Подключаем Browser Sync
    cleanCSS = require('gulp-clean-css');
    uglify = require('gulp-uglifyjs');
    autoprefixer = require('gulp-autoprefixer');
    sourcemaps = require('gulp-sourcemaps');
    del          = require('del');
    rimraf = require('rimraf');

gulp.task('less', function(){ // Создаем таск Less
    return gulp.src(['app/less/**/*.less', // Берем все less файлы из папки less и дочерних, если таковые будут
    '!app/less/**/_*'])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(less()) // Преобразуем less в CSS посредством gulp-less

        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});


gulp.task('lessBuild', function(){ // Создаем таск Less
    return gulp.src(['app/less/**/*.less', // Берем все less файлы из папки less и дочерних, если таковые будут
    '!app/less/**/_*'])
        .pipe(less()) // Преобразуем less в CSS посредством gulp-less

        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});



gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});


gulp.task('watch', function() {
    gulp.watch('app/less/**/*.less', gulp.parallel('less')); // Наблюдение за less файлами
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});


//gulp.task('uglify', function() {
    //return gulp.src('dist/js/**/*.js')
    //.pipe(uglify())
    //.pipe(gulp.dest('dist/js'))
//});

//gulp.task('minifycss', function() {
    //return gulp.src('dist/css/**/*.css')
    //.pipe(minifyCss())
    //.pipe(gulp.dest('dist/css'))
//});

//gulp.task('gulp-clean-css',() => {
    //console.log('hello tolik!');
    //return gulp.src('dist/css/**/*.css')
      //.pipe(sourcemaps.init())
      //.pipe(cleanCSS({debug: true}, (details) => {
       // console.log(`${details.name}: ${details.stats.originalSize}`);
       // console.log(`${details.name}: ${details.stats.minifiedSize}`);
      //}))
      //.pipe(gulp.dest('dist/css'));
//});

//gulp.task('minify-css', () => {
    //return gulp.src('dist/css/*.css')
      //.pipe(cleanCSS({debug: true}, (details) => {
        //console.log(`${details.name}: ${details.stats.originalSize}`);
        //console.log(`${details.name}: ${details.stats.minifiedSize}`);
      //}))
    //.pipe(gulp.dest('dist/css'));
 // });


gulp.task('scripts', function() {
    return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});





const fs = require('fs');
const path = require('path');
const directory = 'dist';

gulp.task('clean', async function() {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        rimraf(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
});



/*gulp.task('clean', async function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});*/






gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});


gulp.task('prebuild', async function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/**/*'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    //var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    //.pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

    var buildImg = gulp.src('app/img/**/*') // Берем все изображения из app
    .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен

    var buildAnotherCss = gulp.src([ 
        'app/css/**/*'
        ])
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }))
    .pipe(gulp.dest('dist/css'));

    var buildAnotherJs = gulp.src('app/js/**/*') 
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});





gulp.task('default', gulp.parallel('less', 'browser-sync', 'watch'));

gulp.task('build', gulp.series('clean', 'lessBuild', 'prebuild')); 