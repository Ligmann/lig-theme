require('dotenv').config();

const color = require('cli-color');

const path = require('path');
const named = require('vinyl-named');

const gulp = require('gulp');

const webpack = require('webpack-stream');
const webpack_config = require('./webpack.config.js');

const node_sass = require('node-sass');
const sass = require('gulp-sass');
const gulp_sass = sass(node_sass);
const prefix = require('gulp-autoprefixer');

const webp = require('gulp-webp');
const gulp_imagemin = require('gulp-imagemin');

const browserSync = require('browser-sync');
const server = browserSync.create();

const del = require('del');

const errorHandler = (error) => {
    console.error(error);

    this.emit('end');
}

const clean = () => {
    console.log(color.yellow(`Usuwanie plików z katalogu "${process.env.DEST_PATH}"`));

    return del([process.env.DEST_PATH], { force: true });
}

const copy = async (next) => {
    console.log(color.yellow(`Przenoszenie szablonu...`));

    let src = [
        process.env.SRC_PATH + "/**/*.{css,php,ttf,woff,woff2,svg}",
    ];
    let dest = process.env.DEST_PATH;

    gulp.src(src)
        .pipe(gulp.dest(dest));

    await next();
}

const process_webpack = async (next) => {
    console.log(color.yellow(`Przebudowywanie skryptów szablonowych...`));

    let src = [
        path.relative('.', process.env.SRC_PATH + "/" + process.env.SCRIPTS_DIR + "/*.js"),
    ];
    let dest = path.relative(".", process.env.DEST_PATH + "/assets/" + process.env.SCRIPTS_DIR);

    gulp.src(src)
        .pipe(named())
        .pipe(webpack(webpack_config).on("error", errorHandler))
        .pipe(gulp.dest(dest));

    console.log(color.green(src), color.magenta(dest));

    await next();
}

const process_images = async (next) => {
    console.log(color.yellow(`Kompresowanie obrazów...`));

    let src = [
        process.env.SRC_PATH + "/" + process.env.IMAGES_DIR + "/**/*.{jpg,jpeg,png,gif,svg}",
    ];
    let dest = path.normalize(process.env.DEST_PATH + "/assets/" + process.env.IMAGES_DIR);

    gulp.src(src)
        .pipe(gulp_imagemin())
        .pipe(gulp.dest(dest));

    gulp.src(src)
        .pipe(webp())
        .pipe(gulp.dest(dest));

    console.log(color.green(src), color.magenta(dest));

    await next();
}

const process_webp = async (next) => {
    console.log(color.yellow(`Konwertowanie obrazów do WEBP...`));

    let src = [
        process.env.DEST_PATH + "/assets/" + process.env.IMAGES_DIR + "/**/*.{jpg,jpeg,png}",
    ];
    let dest = path.normalize(process.env.DEST_PATH + "/assets/" + process.env.IMAGES_DIR);

    gulp.src(src)
        .pipe(webp())
        .pipe(gulp.dest(dest));

    console.log(color.green(src), color.magenta(dest));

    await next();
}

const process_vendor_webpack = async (next) => {
    console.log(color.yellow(`Przebudowywanie skryptów zewnętrznych...`));

    let src = [
        path.relative('.', process.env.SRC_PATH + "/" + process.env.VENDOR_SCRIPTS_DIR + "/**/main.js"),
    ];
    let dest = path.relative(".", process.env.DEST_PATH + "/" + process.env.VENDOR_SCRIPTS_DIR);

    gulp.src(src)
        .pipe(named(function(file) {
            return path.basename(path.dirname(file.path));
        }))
        .pipe(webpack(webpack_config).on("error", errorHandler))
        .pipe(gulp.dest(dest));

    console.log(color.green(src), color.magenta(dest));

    await next();
}

const process_sass = async (next) => {
    console.log(color.yellow("Przebudowywanie stylów szablonowych..."));

    let src = [
        process.env.SRC_PATH + "/" + process.env.STYLES_DIR + "/**/*.scss",
        "!" + process.env.SRC_PATH + "/" + process.env.STYLES_DIR + "/**/(^_*).scss",
    ];
    let dest = path.normalize(process.env.DEST_PATH + "/assets/" + process.env.STYLES_DIR);

    gulp.src(src)
        .pipe(gulp_sass({
            outputStyle: 'compressed',
        }))
        .pipe(prefix())
        .pipe(gulp.dest(dest));

    console.log(color.green(src), color.magenta(dest));

    await next();
}

const process_vendor_sass = async (next) => {
    console.log(color.yellow("Przebudowywanie stylów zewnętrznych..."));

    let src = [
        process.env.SRC_PATH + "/" + process.env.VENDOR_STYLES_DIR + "/**/*.scss",
        "!" + process.env.SRC_PATH + "/" + process.env.VENDOR_STYLES_DIR + "/**/(^_*).scss",
    ];
    let dest = path.normalize(process.env.DEST_PATH + "/" + process.env.VENDOR_STYLES_DIR);

    gulp.src(src)
        .pipe(gulp_sass({
            outputStyle: 'compressed',
        }))
        .pipe(gulp.dest(dest));

    console.log(color.green(src), color.magenta(dest));

    await next();
}

const reload = async (next) => {
    console.log(color.yellow("Przeładowywanie strony..."));

    server.reload();

    await next();
}

const watch = async (next) => {
    gulp.watch('**/*', {
        cwd: process.env.DEST_PATH
    }, reload);

    gulp.watch([
        "**/*",
        "!" + process.env.IMAGES_DIR + "/**/*",
        "!" + process.env.IMAGES_DIR,
        "!" + process.env.SCRIPTS_DIR + "/**/*",
        "!" + process.env.SCRIPTS_DIR,
        "!" + process.env.STYLES_DIR + "/**/*",
        "!" + process.env.STYLES_DIR,
        "!" + process.env.VENDOR_STYLES_DIR + "/**/*",
        "!" + process.env.VENDOR_STYLES_DIR,
        "!" + process.env.VENDOR_SCRIPTS_DIR + "/**/*",
        "!" + process.env.VENDOR_SCRIPTS_DIR,
    ], { cwd: process.env.SRC_PATH }, copy);

    gulp.watch([
        process.env.IMAGES_DIR + "/**/*.{jpg,jpeg,png}",
    ], { cwd: process.env.SRC_PATH }, process_images);

    gulp.watch([
        process.env.STYLES_DIR + "/**/*.scss",
    ], { cwd: process.env.SRC_PATH }, process_sass);

    gulp.watch([
        process.env.SCRIPTS_DIR + "/**/*.js",
    ], { cwd: process.env.SRC_PATH }, process_webpack);

    gulp.watch([
        process.env.VENDOR_STYLES_DIR + "/**/*.scss",
    ], { cwd: process.env.SRC_PATH }, process_vendor_sass);

    gulp.watch([
        process.env.VENDOR_SCRIPTS_DIR + "/**/*.js",
    ], { cwd: process.env.SRC_PATH }, process_vendor_webpack);

    server.init({
        host: process.env.HOST,
        port: process.env.PORT,
        open: "external",
    });

    await next();
}

module.exports.clean = clean;
module.exports.copy = copy;

module.exports.vendor_webpack = process_vendor_webpack;
module.exports.webpack = process_webpack;

module.exports.vendor_sass = process_vendor_sass;
module.exports.sass = process_sass;

module.exports.default = gulp.series(clean, copy, process_images, process_webp, gulp.parallel(process_vendor_webpack, process_webpack, process_vendor_sass, process_sass));
module.exports.watch = watch;