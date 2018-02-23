// BUILD: February 22, 2018 v3.0.0 

var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
modernizr = require('gulp-modernizr');


//------------------------------------------------------------------------------
// GULP WATCH
// css && html auto refresh in browser
//------------------------------------------------------------------------------

gulp.task('watch', function(){
   
    browserSync.init({
        notify: false, 
        browser: 'google chrome',
        server: {
            baseDir: "Natours/dev"
        }
    });
});
    
    watch('./Natours/dev/index.html', function(){
        // TODO: update to *.html or any other front-end file type
        browserSync.reload();
    });

    watch('./Natours/dev/assets/styles/**/*.scss', function(){
        gulp.start('cssInject');
    });

    watch('./Natours/dev/assets/scripts/**/*.js', function(){
        gulp.start('scriptsRefresh');
    });

// inject CSS into browserSync without reload 

gulp.task('cssInject', ['css'], function(){
    return gulp.src('./Natours/dev/temp/css/styles.css')
    .pipe(browserSync.stream());
});

// compiles JavaScript files [*.js && modernizr.js]

gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
});


//------------------------------------------------------------------------------
// GULP CSS 
// compile all CSS files 
//------------------------------------------------------------------------------

gulp.task('css', function() {
    return gulp.src('./Natours/dev/assets/styles/styles.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
        .on('error', function(error){
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./Natours/dev/temp/css/'))
});





//------------------------------------------------------------------------------
// GULP MODERNIZER
// check browser for legacy requirements  
// add this to BUILD task 
//------------------------------------------------------------------------------

gulp.task('modernizr', function(){
    return gulp.src(['./Natours/dev/assets/styles/**/*.css', './Natours/dev/assets/scripts/**/*.js'])
        .pipe(modernizr({
            'options': [
                'setClasses' 
            ]   
        }))
        .pipe(gulp.dest('./Natours/dev/temp/scripts'));
});