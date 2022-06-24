'use strict'

const assert = require('assert')
const testCases = require('./testCases')
const negotiate = require('../index').negotiate

for (const [header, supportedEncodings, expected] of testCases) {
  assert.equal(negotiate(header, supportedEncodings), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)
}
