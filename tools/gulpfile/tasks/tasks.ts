//
//
//

import * as jekyll from './jekyllrb'
import * as styles from './styles'

const browserSync = require('browser-sync')
const { parallel, series } = require('gulp')

export const CLEAN_TASKS = [
  jekyll.clean,
  styles.clean
]

export const CHECK_TASKS = [
  styles.check
]

export const BUILD_TASKS = [
  styles.build
]

export const SPEC_TASKS = [
]

export const WATCH_TASKS = [
  jekyll.watch,
  styles.watch
]

function startLocalhost() {
  return browserSync(null, {
    server: {
      baseDir: ['tmp/serve']
    }
  })
}

export const clean = parallel(...CLEAN_TASKS)
export const check = parallel(...CHECK_TASKS)
export const build = parallel(...BUILD_TASKS)
export const rebuild = series(...CLEAN_TASKS, ...BUILD_TASKS)
export const serve = series(
  parallel(
    ...CLEAN_TASKS
  ),
  parallel(
    ...CHECK_TASKS, ...BUILD_TASKS
  ),
  jekyll.build,
  parallel(
    startLocalhost, ...WATCH_TASKS
  )
)
export const tests = series(
)