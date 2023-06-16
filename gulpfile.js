import gulp from 'gulp';
import less from'gulp-less';
import concat from 'gulp-concat';
import minify from 'gulp-minify';
import del from 'del';

const jsScripts = ['./src/public/scripts/jquery.js',
                    './src/public/scripts/createUser.js',
                    './src/public/scripts/editUser.js',
                    './src/public/scripts/usersList.js'];

const pugs = ['./src/public/views/*.pug'];


function styles(){
    return gulp.src('./src/public/less/styles.less')
            .pipe(less())
            .pipe(gulp.dest('./build_gulp/css'));
}

function scripts(){
    return gulp.src(jsScripts)
            .pipe(concat('scripts.js'))
            .pipe(minify())
            .pipe(gulp.dest('./build_gulp/scripts'));
    }

function pugTemplates(){
    return gulp.src(pugs)
        .pipe(gulp.dest('./build_gulp/views'));
}

function watch(){
    gulp.watch('./src/public/less/styles.less', styles);
    gulp.watch(jsScripts, scripts);
    gulp.watch(pugs, pugTemplates);
}

function clear(){
    return del(['build_gulp/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('pugs', pugTemplates);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clear,
                                gulp.parallel(styles, scripts, pugTemplates)));

//gulp build -- сборка проекта в папку build_gulp