//
// style tasks
//

const browserSync = require('browser-sync')
const del = require('del')
const { dest, parallel, series, src, watch } = require('gulp')
const plug = require('gulp-load-plugins')({ lazy: true })

/**
 *
 */
function _src(): string[] {
  return ['src/**/*.scss']
}

/**
 *
 */
function cleanStyles() {
  return del(['{src,tmp/serve}/assets/css/**/*.{css,css.map}'])
}

/**
 *
 */
function checkStyles() {
  const config = {
    bundleExec: true
  }
  return src([..._src(), '!src/assets/css/main.scss'])
    .pipe(plug.scssLint(config))
}

/**
 *
 */
function buildStyles() {
  return src(_src())
    .pipe(plug.sourcemaps.init())
    .pipe(plug.sass())
    .pipe(plug.sourcemaps.write('.'))
    .pipe(dest('tmp/serve'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(dest('src'))
}

/**
 *
 */
function watchStyles() {
  return watch(_src(), series(
    cleanStyles, parallel(checkStyles, buildStyles)
  ))
}

export {
  cleanStyles as clean,
  checkStyles as check,
  buildStyles as build,
  watchStyles as watch
}