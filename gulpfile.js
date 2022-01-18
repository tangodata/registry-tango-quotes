const { src, dest, series, parallel } = require('gulp')
const pug = require('gulp-pug')
const htmltidy = require('gulp-htmltidy')
const prettier = require('gulp-prettier')
const markdown = require('gulp-markdown')
const uglify = require('gulp-uglify')
const data = require('gulp-data')
const yaml = require('gulp-yaml')
const rename = require('gulp-rename')
const frontmatter = require('gulp-front-matter')

//=============================
const SOURCE = 'source/**'
const DESTINATION = 'release'
//=============================S

const config_prettier = {
  semi: false,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
}

const config_htmltidy = {
  doctype: 'html5',
  hideComments: true,
  indent: true,
}

const config_markdown = {}

const config_yaml = {
  schema: 'DEFAULT_SAFE_SCHEMA',
  space: 2,
  safe: true,
}

const config_frontmatter = {
  property: 'page',
}

//=============================

function jstask(cb) {
  return src(SOURCE+'/*.js')
  .pipe(prettier(config_prettier))
  .pipe(dest(DESTINATION))
}

function pugtask(cb) {
  return src(SOURCE+'/*.pug')
  .pipe(pug())
  .pipe(htmltidy(config_htmltidy))
  .pipe(dest(DESTINATION))
}

function mdtask(cb) {
  return src(SOURCE+'/*.md')
  .pipe(markdown(config_markdown))
  .pipe(htmltidy(config_htmltidy))
  .pipe(dest(DESTINATION))
}


/*
.pipe(data((file) => {
  return { 'foo': file.path }
}))
*/


function yamltask(cb) {
  return src(SOURCE+'/*.yaml')
  .pipe(yaml(config_yaml))
  .pipe(dest(DESTINATION))
}

exports.default = parallel(
  jstask,
  pugtask,
  mdtask,
  yamltask,
)
