'use strict'

const test = require('tap').test
const testCases = require('./testCases')
const negotiate = require('../index').negotiate

for (const [header, supportedEncodings, expected] of testCases) {
  test(`should return ${expected} when ${header} and ${supportedEncodings}`, t => {
    t.plan(1)
    t.equal(negotiate(header, supportedEncodings), expected)
  })
}
