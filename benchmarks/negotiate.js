'use strict'

const { Suite } = require('benchmark')
const encodingNegotiator = require('..')

const suite = new Suite()

const benchCases = require('./benchCases')

for (let i = 0; i < benchCases.length; ++i) {
  const [header, supportedEncodings] = benchCases[i]
  suite.add(`${header} and ${supportedEncodings}`, function () {
    encodingNegotiator.negotiate(header, supportedEncodings)
  })
}
suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
    console.log('Slowest is ' + this.filter('slowest').map('name'))
  })
  .run({ async: true })
