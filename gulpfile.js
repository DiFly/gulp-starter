const { src, dest, series, parallel, watch } = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

const DIST_FOLDER = "./dist/";
const SRC_FOLDER = "./src/";

const path = {
  build: {
    html: DIST_FOLDER,
    css: DIST_FOLDER + "css/",
    js: DIST_FOLDER + "js/",
    font: DIST_FOLDER + "font/",
    img: DIST_FOLDER + "img/",
  },
  src: {
    html: SRC_FOLDER + "**/*.html",
    css: SRC_FOLDER + "css/**/*.css",
    scss: SRC_FOLDER + "scss/**/*.scss",
    js: SRC_FOLDER + "js/**/*.js",
    font: SRC_FOLDER + "font/**/*.{ttf,ttf2}",
    img: SRC_FOLDER + "img/**/*.{jpg,jpeg,png,ico,webp,svg,gif}",
  },
  watch: {
    html: SRC_FOLDER + "**/*.html",
    css: SRC_FOLDER + "css/**/*.css",
    scss: SRC_FOLDER + "scss/**/*.scss",
    js: SRC_FOLDER + "js/**/*.js",
    font: SRC_FOLDER + "font/**/*.{ttf,ttf2}",
    img: SRC_FOLDER + "img/**/*.{jpg,jpeg,png,ico,webp,svg,gif}",
  },
};

function clean() {
  return del([DIST_FOLDER + "**"]);
}

function cssTranspile() {
  return src(path.src.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(src(path.src.css))
    .pipe(dest(path.build.css));
}

function cssBundle() {
  return src(path.build.css + "**/*.css")
    .pipe(concat("style.bundle.css"))
    .pipe(dest(path.build.css));
}

function cssMinify() {
  return src(path.build.css + "style.bundle.css")
    .pipe(cleanCSS())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(path.build.css));
}

function css() {}

function jsTranspile() {
  return src(path.src.js)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest(path.build.js));
}

function jsBundle() {
  return src(path.src.js)
    .pipe(concat("script.bundle.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest(path.build.js));
}

function jsMinify() {
  return src(path.build.js + "script.bundle.js")
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(path.build.js));
}

function js() {}

function htmlToDist() {
  return src(path.src.html).pipe(dest(path.build.html));
}

function htmlMinify() {
  return src(path.build.html + "**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest(path.build.html));
}

function html() {}

function imgToDist() {
  return src(path.src.img).pipe(dest(path.build.img));
}

function imgMinify() {
  return src(path.build.img + "**/*.{jpg,jpeg,png,ico,webp,svg,gif}")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.img));
}

function img() {}

function fontToDist() {
  return src(path.src.font).pipe(dest(path.build.font));
}

function font() {}

function minify() {}

function start() {}

function browsersync() {
  return browserSync.init({
    server: {
      baseDir: DIST_FOLDER,
    },
    port: 3000,
    notify: true,
  });
}

function htmlWatch() {
  return watch(path.watch.html, series(delHtml, htmlToDist)).on(
    "change",
    browserSync.reload
  );
}

function cssWatch() {
  return watch(
    [path.watch.scss, path.watch.css],
    series(delCss, cssTranspile, cssBundle, cssMinify)
  ).on("change", browserSync.reload);
}

function jsWatch() {
  return watch(
    path.watch.js,
    series(delJs, jsTranspile, jsBundle, jsMinify)
  ).on("change", browserSync.reload);
}

function delCss() {
  return del(path.build.css);
}

function delJs() {
  return del(path.build.js);
}

function delHtml() {
  return del(path.build.html);
}

let build = series(
  clean,
  parallel(
    series(cssTranspile, cssBundle),
    series(jsTranspile, jsBundle),
    htmlToDist,
    fontToDist,
    imgToDist
  ),
  parallel(cssMinify, jsMinify, htmlMinify, imgMinify)
);

let serve = parallel(build, htmlWatch, cssWatch, jsWatch, browsersync);

exports.default = serve;
exports.serve = serve;
exports.clean = clean;
exports.build = build;
