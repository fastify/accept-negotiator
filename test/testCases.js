'use strict'

module.exports = [
  ['gzip, , identity', ['deflate', 'gzip'], 'gzip'],
  ['identity;q=1', ['gzip', 'identity'], 'identity'],
  ['gzip;q=1, identity;q=0.5', ['gzip', 'deflate'], 'gzip'],
  ['gzip, identity;q=0.5', ['gzip', 'deflate'], 'gzip'],
  ['gzip, , identity', ['deflate', 'gzip'], 'gzip'],
  ['gzip', ['gzip', 'deflate'], 'gzip'],
  ['deflate;q=0.5,identity; q=0.5', ['gzip', 'deflate'], 'deflate'],
  ['deflate;q=0.5, gzip;q=0.5', ['gzip', 'deflate'], 'gzip'],
  ['deflate;q=0.5, gzip;q=0.5', ['deflate', 'gzip'], 'deflate'],
  ['*', ['gzip', 'deflate'], 'gzip'],
  ['deflate;q=1.0, *', ['gzip'], 'gzip'],
  ['test,br', ['br'], 'br'],
  ['gzip;q=0', [], null],
  ['gzip;q=0', ['gzip', 'identity'], null],
  ['qzip;q=0.8', ['qzip', 'identity'], 'qzip'],
  ['qz3ip;q=0.9', ['qz3ip', 'identity'], 'qz3ip'],
  ['white rabbit', ['gzip', 'identity'], null],
  [undefined, ['gzip', 'identity'], null],
  ['compress;q=0.5, gzip;q=1.0', ['gzip', 'compress'], 'gzip'],
  ['', ['gzip', 'compress'], null],
  ['   ', ['gzip', 'compress'], null],
  [' , ', ['gzip', 'compress'], null],
  [' ,, ', ['gzip', 'compress'], null],
  ['gzip;q=1.0, compress;q=0.5', ['compress', 'gzip'], 'gzip'],
  [';gzip;q=0.8', ['gzip', 'compress'], 'gzip'],
  [' ;gzip;q=0.8', ['gzip', 'compress'], 'gzip'],
  [' ; gzip;q=0.8', ['gzip', 'compress'], 'gzip'],
  [' ; gzip ;q=0.8', ['gzip', 'compress'], 'gzip'],
  [' ; gzip; q=0.8', ['gzip', 'compress'], 'gzip'],
  [' ; gzip ; q=0.8', ['gzip', 'compress'], 'gzip'],
  ['iden tity;q=1', ['identity'], null],
  ['iden tity;q=1', ['tity'], 'tity'],
  ['compress;q=0.5, gzip;q=1.0', ['compress'], 'compress'],
  ['  compress;q=0.5, gzip;q=1.0', ['compress'], 'compress'],
  ['gzip, deflate, br', ['br', 'gzip', 'deflate'], 'br'],
  ['*', ['br', 'gzip', 'deflate'], 'br'],
  ['*;q=0, identity;q=1', ['gzip', 'identity'], 'identity'],
  ['identity;q=0', ['identity'], null],
  ['gzip, compress;q=0', ['compress', 'gzip'], 'gzip'],
  ['gzip;q=0.8, deflate', ['gzip', 'deflate'], 'deflate'],
  ['gzip;q=0.8, identity;q=0.5, *;q=0.3', ['deflate', 'gzip', 'br'], 'gzip'],
  [';qzip;q=1gzip', ['qzip'], 'qzip'],
  // non-standard
  [';gzip;q=abc', ['gzip', 'abc'], 'abc'],
  ['iden tity;q = 1', ['tity'], 'tity'],
  ['iden tity;q = 1f', ['tity'], 'tity'],
  ['gzip;q=1, identity;q=0.f5', ['identity'], null],
  ['gzip;q=1, identity;q=0.f5', ['f5', 'gzip'], 'f5']
]
