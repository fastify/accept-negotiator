'use strict'

const test = require('tap').test
const testCases = require('./testCases')
const Negotiator = require('../index').Negotiator

test('should create Negotiator-Instances', t => {
  t.plan(2)
  t.ok(new Negotiator() instanceof Negotiator)
  t.ok(Negotiator() instanceof Negotiator)
})

for (const [header, supportedEncodings, expected] of testCases) {
  test(`should return ${expected} when ${header} and ${supportedEncodings}`, t => {
    t.plan(4)
    const negotiatorNoCache = new Negotiator({ supportedValues: supportedEncodings })
    t.equal(negotiatorNoCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)

    const negotiatorNonClass = Negotiator({ supportedValues: supportedEncodings })
    t.equal(negotiatorNonClass.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)

    const negotiatorCache = new Negotiator({ supportedValues: supportedEncodings, cache: new Map() })
    t.equal(negotiatorCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)
    t.equal(negotiatorCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)
  })
}
