'use strict'

const { test } = require('node:test')
const { tspl } = require('@matteo.collina/tspl')
const testCases = require('./testCases')
const negotiate = require('../index').negotiate

for (const [header, supportedEncodings, expected] of testCases) {
  test(`should return ${expected} when ${header} and ${supportedEncodings}`, t => {
    const { strictEqual } = tspl(t, { plan: 1 })
    strictEqual(negotiate(header, supportedEncodings), expected)
  })
}
