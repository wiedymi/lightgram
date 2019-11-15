/* eslint-disable */
require = require('esm')(module /*, options*/)
require('module-alias/register')

const { parse } = require('graphql')
const { readFileSync } = require('fs')

const VALID_EXTENSIONS = ['graphql', 'graphqls', 'gql', 'gqls']

function handleModule(m, filename) {
  const root = process.cwd()
  const content = readFileSync(filename, 'utf-8')
  const directive = readFileSync(`${root}/src/modules/directives.graphql`, 'utf-8')

  m.exports = parse(content + directive)
}

VALID_EXTENSIONS.forEach(ext => {
  require.extensions[`.${ext}`] = handleModule
})

process.setMaxListeners(0)
process.on('SIGINT', function() {
  process.exit(0)
})

module.exports = require('./app.js')
