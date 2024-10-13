'use strict'

const { test } = require('node:test')
const { tspl } = require('@matteo.collina/tspl')
const testCases = require('./testCases')
const Negotiator = require('../index').Negotiator

test('should create Negotiator-Instances', t => {
  const { ok } = tspl(t, { plan: 2 })

  ok(new Negotiator() instanceof Negotiator)
  ok(Negotiator() instanceof Negotiator)
})

for (const [header, supportedEncodings, expected] of testCases) {
  test(`should return ${expected} when ${header} and ${supportedEncodings}`, t => {
    const { strictEqual } = tspl(t, { plan: 4 })
    const negotiatorNoCache = new Negotiator({ supportedValues: supportedEncodings })
    strictEqual(negotiatorNoCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)

    const negotiatorNonClass = Negotiator({ supportedValues: supportedEncodings })
    strictEqual(negotiatorNonClass.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)

    const negotiatorCache = new Negotiator({ supportedValues: supportedEncodings, cache: new Map() })
    strictEqual(negotiatorCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)
    strictEqual(negotiatorCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)
  })
}
