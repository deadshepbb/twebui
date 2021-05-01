'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  branch: 'dev',
  API_ROOT:  '"http://192.168.28.213:8000/jtwy"'
})
