const { src, dest, series, parallel } = require('gulp')
const debug = require('gulp-debug')
const yaml = require('gulp-yaml')
const pug = require('gulp-pug')
const htmltidy = require('gulp-htmltidy')
const prettier = require('gulp-prettier')
const markdown = require('gulp-markdown')
const uglify = require('gulp-uglify')
const data = require('gulp-data')
const rename = require('gulp-rename')
const frontmatter = require('gulp-front-matter')
const del = require('del')
const swagger = require('gulp-swagger')
const ajv = require('gulp-ajv')

//const converttask = require('./scripts/gulp.convert')


//=============================
const SOURCE = 'source/**'
const PUBLIC = 'public'
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

function cleantask(cb) {
  return del([
    DESTINATION+'/**',
    '!'+DESTINATION,
  ])
}

function servetask(cb) {
  return cb()
}

function styletask(cb) {
  return src(SOURCE+'/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('dist.css'))
  .pipe(dest(DESTINATION))
}

function scripttask(cb) {
  return src(SOURCE+'/*.js')
  .pipe(concat('dist.js'))
  .pipe(dest(DESTINATION))
}

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

function yamltask(cb) {
  return src(SOURCE+'/*.yaml')
  .pipe(yaml(config_yaml))
  .pipe(dest(DESTINATION))
}

function publictask(cb) {
  return src(PUBLIC+'/**/*')
  .pipe(dest(DESTINATION))
}

function validatetask(cb) {
  return src('test/zones.json')
  .pipe(debug({title: 'unicorn:'}))
  .pipe(ajv('test/zones.schema.json'))
  .pipe(debug({title: 'unicorn:'}))
}

function swaggertask(cb) {
  return src('test/api.yaml')
  .pipe(swagger('test/api.schema.json'))
  .pipe(dest(DESTINATION))
}

exports.clean = cleantask
exports.validate = validatetask
exports.swagger = swaggertask

exports.default =
series(
  cleantask,
  parallel(
    jstask,
    pugtask,
    mdtask,
    yamltask,
    //converttask,
  ),
  publictask,
)

//exports.convert = converttask

