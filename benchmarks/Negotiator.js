'use strict'

const { Suite } = require('benchmark')
const { Negotiator } = require('..')

const benchCases = require('./benchCases')

for (let i = 0; i < benchCases.length; ++i) {
  const [header, supportedEncodings] = benchCases[i]
  const suite = new Suite()
  const negotiator = new Negotiator({ supportedValues: supportedEncodings })
  suite
    .add(`${header} and ${supportedEncodings}`, function () {
      negotiator.negotiate(header)
    })
    .on('cycle', function (event) {
      console.log(String(event.target))
    })
    .run()
}
