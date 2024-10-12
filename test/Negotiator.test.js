'use strict'

const { test } = require('node:test')
const testCases = require('./testCases')
const Negotiator = require('../index').Negotiator

test('should create Negotiator-Instances', t => {
  t.plan(2)
  t.assert.ok(new Negotiator() instanceof Negotiator)
  t.assert.ok(Negotiator() instanceof Negotiator)
})

for (const [header, supportedEncodings, expected] of testCases) {
  test(`should return ${expected} when ${header} and ${supportedEncodings}`, t => {
    t.plan(4)
    const negotiatorNoCache = new Negotiator({ supportedValues: supportedEncodings })
    t.assert.strictEqual(negotiatorNoCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)

    const negotiatorNonClass = Negotiator({ supportedValues: supportedEncodings })
    t.assert.strictEqual(negotiatorNonClass.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)

    const negotiatorCache = new Negotiator({ supportedValues: supportedEncodings, cache: new Map() })
    t.assert.strictEqual(negotiatorCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)
    t.assert.strictEqual(negotiatorCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)
  })
}
