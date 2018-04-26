var gulp = require("gulp"),
    {exec} = require("child_process"),
    BrowserSync = require("browser-sync"),
    sass = require("gulp-sass"),
    responsive = require('gulp-responsive'),
    metalsmith = require('gulp-metalsmith');

var layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks');

gulp.task('smithy', function () {
    return gulp.src('./src/**')
    .pipe(metalsmith({
        root: __dirname,
        frontmatter: true,
        clean: true,
        use: [
            markdown({
                smartypants: true,
                gfm: true,
                tables: true,
                langPrefix: 'language-'
            }),
            permalinks(),
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

// gulp.task('images', function () {
//     return gulp.src(['./assets/images/**/*.{png,jpg,jpeg,gif}'])
//       .pipe(responsive(
//         {
//             quality: 70,
//             progressive: true,
//             compressionLevel: 6,
//             withMetadata: false,
//         }))
//       .pipe(gulp.dest('dist/images'));
//   });

// const browserSync = BrowserSync.create();
const sassOpts = {
    outputStyle: 'compressed',
    includePaths: ['./node_modules/loom/assets'],
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
});

gulp.task('sync', ['sass', 'smithy', 'watch'],  function() {
    BrowserSync.init({
        server: './dist'
    });
});

gulp.task('default', ['sync'], function() {});

gulp.task('build', ['sass', 'smithy']);
