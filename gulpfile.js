const gulp = require("gulp");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

const styles = [
  "./src/scss/global.scss",
  "./src/scss/style.scss",
  "./src/scss/media.scss",

];

function css_style() {
  return gulp
    .src(styles)
    .pipe(concat("style.css"))
    .pipe(
      sass({
        errorLogToConsole: true,
        outputStyle: "compressed"
      })
    )
    .pipe(
      cleanCSS({
        level: 2
      })
    )
    .pipe(gulp.dest("./src/style/"))
    .pipe(browserSync.stream());
}

function browserWatch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./src/scss/**", css_style);
  gulp.watch("./**").on("change", browserSync.reload);
}

gulp.task('default',browserWatch);