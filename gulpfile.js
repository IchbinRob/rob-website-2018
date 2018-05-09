const gulp = require("gulp"),
    {exec} = require("child_process"),
    BrowserSync = require("browser-sync"),
    sass = require("gulp-sass"),
    responsive = require('gulp-responsive'),
    metalsmith = require('gulp-metalsmith');

const layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    collections = require('metalsmith-collections');

gulp.task('smithy', function () {
    return gulp.src('./src/**')
    .pipe(metalsmith({
        root: __dirname,
        frontmatter: true,
        clean: true,
        use: [
          collections({
                sections: {
                    pattern: '*.md',
                    sortBy: 'weight'
                }
            }),
            markdown({
                smartypants: true,
                gfm: true,
                tables: true,
                langPrefix: 'language-'
            }),
            // permalinks(),
            layouts({
                engine: 'nunjucks',
                default: 'default.njk',
            })
        ],
        metadata: {
          site: {
            url: 'https://robinsonlacotte.com',
            title: 'robinsonlacotte.com',
            author: 'Robinson Lacotte | ichbinrob'
          }
        }
      }))
      .pipe(gulp.dest('./dist'))
      .pipe(BrowserSync.stream());
});

// gulp.task('movies', function () {
//     return gulp.src(['./images/**/*.mp4'], { base: './' })
//     .pipe(gulp.dest('./content'));
// });

gulp.task('js', function () {
    return gulp.src(['./assets/js/*.js'])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function () {
    return gulp.src(['./assets/images/**/*.{png,jpg,jpeg,gif}'])
      // .pipe(responsive(
      //   {
      //       quality: 70,
      //       progressive: true,
      //       compressionLevel: 6,
      //       withMetadata: false,
      //   }))
      .pipe(gulp.dest('dist/images'));
  });

  gulp.task('fonts', function () {
      return gulp.src(['./assets/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts'));
    });

// const browserSync = BrowserSync.create();
const sassOpts = {
    outputStyle: 'compressed',
    errLogToConsole: true };

// Build Sass files into CSS
gulp.task('sass', () => {
    return gulp.src('./assets/sass/*.scss')
        .pipe(sass(sassOpts))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(BrowserSync.stream());
});

// Serve files via Browser sync
gulp.task('browser-sync', () => {
    return BrowserSync.init({
        server: {
            baseDir: "./dist/"
        },
        open: false
    });
});

gulp.task('watch', () => {
    gulp.watch("./assets/sass/**/*.scss", ['sass']);
    gulp.watch('./src/**/*', ["smithy"]);
    gulp.watch('./layouts/**/*', ["smithy"]);
    gulp.watch("./assets/js/**/*.js", ['js']);
});

gulp.task('sync', ['sass', 'smithy', 'images', 'fonts', 'js', 'watch'],  function() {
    BrowserSync.init({
        server: './dist'
    });
});

gulp.task('default', ['sync'], function() {});

gulp.task('build', ['sass', 'smithy', 'images', 'fonts', 'js']);
