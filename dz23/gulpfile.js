const gulp = require("gulp");
const del = require("del");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const newer = require("gulp-newer");
const browser_sync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const fileInclude = require("gulp-file-include");

//  ***************************************  //
//  ***************  Paths  ***************  //
//  ***************************************  //
const paths = {
  html: {
    src: "src/*.html",
    watch: ["src/html/**/*.html", "src/*.html"],
    dest: "dist/"
  },
  styles: {
    src: [
      "src/styles/**/*.less",
      "src/styles/**/*.sass",
      "src/styles/**/*.scss"
    ],
    dest: "dist/css/"
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/"
  },
  images: {
    src: "src/images/**/*.{jpg,jpeg,png,gif,svg}",
    dest: "dist/img/"
  }
};

//  ***************************************  //
//  ***************  Style  ***************  //
//  ***************************************  //
function styles() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      // .pipe(less())
      .pipe(
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: false
        })
      )
      .pipe(
        cleanCSS({
          level: 2
        })
      ) // minify CSS
      .pipe(concat("main.min.css"))
      .pipe(sourcemaps.write())
      .pipe(size({ showFile: true }))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browser_sync.stream())
  );
}

//  ***************************************  //
//  ***************  Scripts  *************  //
//  ***************************************  //
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write())
    .pipe(size({ showFile: true }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browser_sync.stream());
}
//  ***************************************  //
//  ***************  Images  **************  //
//  ***************************************  //
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(size({ showFile: true }))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(gulp.src(paths.images.src))
    .pipe(newer(paths.images.dest))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(size({ showFile: true }))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browser_sync.stream());
}

//  ***************************************  //
//  *************  HTML minfy  ************  //
//  ***************************************  //
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(fileInclude())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(size({ showFile: true }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browser_sync.stream());
}
//  ***************************************  //
//  ****************  Clean  **************  //
//  ***************************************  //
function clean() {
  return del(["dist/*", "!dist/img"]);
}

//  ***************************************  //
//  ****************  Watch  **************  //
//  ***************************************  //
function watch() {
  browser_sync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  gulp.watch(paths.html.dest).on("change", browser_sync.reload);
  gulp.watch(paths.html.watch, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

//  ***************************************  //
//  ***************  Series  **************  //
//  **************  Parallel  *************  //
//  ***************************************  //
const execut = gulp.series(
  clean,
  html,
  gulp.parallel(styles, scripts, images),
  watch
);

//  ***************************************  //
//  ***************  Exports  *************  //
//  ***************************************  //
exports.html = html;
exports.clean = clean;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.execut = execut;

//  ***************************************  //
//  ***************  Exports  *************  //
//  ***************  Default  *************  //
//  ***************************************  //
exports.default = execut;
