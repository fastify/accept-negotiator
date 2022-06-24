'use strict'

const assert = require('assert')
const testCases = require('./testCases')
const Negotiator = require('../index').Negotiator

assert.ok(new Negotiator() instanceof Negotiator)
assert.ok(Negotiator() instanceof Negotiator)

for (const [header, supportedEncodings, expected] of testCases) {
  const negotiatorNoCache = new Negotiator({ supportedValues: supportedEncodings })
  assert.equal(negotiatorNoCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)

  const negotiatorNonClass = Negotiator({ supportedValues: supportedEncodings })
  assert.equal(negotiatorNonClass.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)

  const negotiatorCache = new Negotiator({ supportedValues: supportedEncodings, cache: new Map() })
  assert.equal(negotiatorCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)
  assert.equal(negotiatorCache.negotiate(header), expected, `should return ${expected} when ${header} and ${supportedEncodings}`)
}
