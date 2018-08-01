var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
var sass            = require('gulp-sass');
var uglify          = require('gulp-uglify');
var babel           = require('gulp-babel');
var concat          = require('gulp-concat');
var rename          = require('gulp-rename');
var mainBowerFiles  = require('gulp-main-bower-files');
var gulpFilter      = require('gulp-filter');
var minifyCss       = require('gulp-minify-css');

const mainPath  = 'app/';
const bowerPath = 'bower_components/';
const destJs    = mainPath + 'public/assets/js/';
const destCss   = mainPath + 'public/assets/css/';

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    //gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src([ 
            bowerPath + "bootstrap/scss/custom.scss",
            bowerPath + "angular-ui-notification/dist/angular-ui-notification.min.css",
            bowerPath + "custom.scss"
        ])
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(destCss))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
    return gulp.src([
        mainPath + '*.js',
        mainPath + 'common/directives/*.js',
        mainPath + 'common/services/*.js',
        mainPath + 'create-table-to-json/*.js',
        mainPath + 'create-table-to-mvc/create-table-to-model/*.js',
        mainPath + 'create-table-to-mvc/create-table-to-view/*.js',
        mainPath + 'create-table-to-mvc/create-table-to-controller/*.js',
        mainPath + 'form-builder/*.js',
        mainPath + 'form-builder/config/*.js',
        mainPath + 'form-builder/form-columns/*.js',
        mainPath + 'form-builder/form-contents/*.js',
        mainPath + 'form-builder/form-menu/*.js',
        mainPath + 'form-builder/form-pages/*.js',
        mainPath + 'form-builder/form-rows/*.js',
        mainPath + 'form-builder/modal/*.js',
        mainPath + 'form-builder/modal/config/*.js',
        mainPath + 'form-builder/render-content/*.js',
        mainPath + 'form-builder/services/*.js',
        mainPath + 'spell-checker/*.js'
    ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify({ mangle: false }).on('error', function(e){
            console.log(e);
        }))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(destJs))
});


gulp.task('default', ['serve']);