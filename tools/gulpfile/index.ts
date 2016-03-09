/// <reference path="../../typings/main.d.ts" />

import {
  clean, check, build, serve, tests
} from './tasks/tasks'

const { task } = require('gulp')

task('clean', clean)
task('check', check)
task('build', build)
task('serve', serve)
task('test',  tests)

// task('release', release)
// task('deploy',  deploy)