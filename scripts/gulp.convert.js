const { src, dest, series, parallel } = require('gulp')
const yaml = require('gulp-yaml')

//=============================
const SOURCE = 'source'
const DESTINATION = 'release'
//=============================S

const config_yaml = {
  schema: 'DEFAULT_SAFE_SCHEMA',
  space: 2,
  safe: true,
}

//=============================

function converttask(cb) {
  return src(SOURCE+'/data/*.yaml')
  .pipe(yaml(config_yaml))
  .pipe(dest(DESTINATION))
}

exports.default = converttask
