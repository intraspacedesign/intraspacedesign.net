//
//
//

const browserSync = require('browser-sync')
const { spawn } = require('child_process')
const del = require('del')
const { series, watch } = require('gulp')

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll'

function cleanJekyll(done) {
  done()
  // return del([
  //   '_site',
  //   '.jekyll-metadata'
  // ])
}

const buildJekyllMsg = '<span style="color:#336699">Running:</span> jekyll build'
function buildJekyll(done) {
  browserSync.notify(buildJekyllMsg)
  return spawn(jekyll, ['build'], { stdio: 'inherit' })
    .on('close', done)
}

function watchJekyll(neverDone) {
  return watch([
    'src/**/*.{csv,html,md,yml}'
  ],
  series(buildJekyll, function reloadBrowsers(done) {
    browserSync.reload()
    done()
  }))
}

export {
  cleanJekyll as clean,
  buildJekyll as build,
  watchJekyll as watch
}