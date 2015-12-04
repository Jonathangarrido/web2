// VARIABLES
  var gulp = require('gulp'),
      connect = require('gulp-connect'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      concat  = require('gulp-concat'),
      minifyCss = require('gulp-minify-css'),
      uglify = require('gulp-uglify'),
      minifyHTML = require('gulp-minify-html'),
      paths = {'bower':'bower_components/'};

// SERVIDOR Y AUTORELOAD
  gulp.task('connect', function() {
    connect.server({
      root: 'app',
      livereload: true,
      port: 7777,
    });
  });

// MINIFICACION HTML
  gulp.task('html', function () {
    var opts = {
      conditionals: true,
      spare:true
    };
     
    return gulp.src('./assets/html/*.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./app/'))
      .pipe(connect.reload());

    // Ó MODIFICACION HTML

    // gulp.src('./app/**/*.html')
    //   .pipe(connect.reload());

  });
 

// CSS
  gulp.task('sass', function () {
    gulp.src([
        './assets/style/main.sass'
      ])
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(concat('./app.css'))
      .pipe(gulp.dest('./app/css'))
      .pipe(connect.reload());

  });


// SCRIPT
  gulp.task('scripts',function(){
    // BIBLIOTECAS EXTERNAS
    gulp.src([
      paths.bower + 'jquery/dist/jquery.min.js',
      paths.bower + 'hammerjs/hammer.min.js',
      // paths.bower + 'bxslider-4/dist/jquery.bxslider.min.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));

    // SCRIPTS INTERNO
    gulp.src([
      'assets/js/1-componentes/*.js',
      'assets/js/2-proyecto/*.js',
    ])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(connect.reload());
  });


// WATCH
  gulp.task('watch', function () {
    // gulp.watch(['./app/*.html'], ['html']);
    gulp.watch('assets/html/*.html', ['html']);
    gulp.watch('assets/style/**/*.sass', ['sass']);
    gulp.watch('assets/js/1-componentes/*.js', ['scripts']);
    gulp.watch('assets/js/2-proyecto/*.js', ['scripts']);
  });


// DEFAULT
  // gulp.task('default', ['connect','scripts','sass','watch']);
  gulp.task('default', ['connect','html','scripts','sass','watch']);


