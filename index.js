'use strict'

function Negotiator (options) {
  if (!new.target) {
    return new Negotiator(options)
  }

  const {
    supportedValues = [],
    cache
  } = (options && typeof options === 'object' && options) || {}

  this.supportedValues = supportedValues

  this.cache = cache
}

Negotiator.prototype.negotiate = function (header) {
  if (typeof header !== 'string') {
    return null
  }
  if (!this.cache) {
    return negotiate(header, this.supportedValues)
  }
  if (!this.cache.has(header)) {
    this.cache.set(header, negotiate(header, this.supportedValues))
  }
  return this.cache.get(header)
}

function negotiate (header, supportedValues) {
  if (
    !header ||
    !Array.isArray(supportedValues) ||
    supportedValues.length === 0
  ) {
    return null
  }

  if (header === '*') {
    return supportedValues[0]
  }

  let preferredEncoding = null
  let preferredEncodingPriority = Infinity
  let preferredEncodingQuality = 0

  // `*` stands for the values that are not listed explicitly (RFC 9110
  // 12.5.3), so it is resolved once the whole header has been read
  let wildcardQuality = 0
  const listedValues = header.indexOf('*') === -1 ? null : []

  function processMatch (enc, quality, isWildcardMatch) {
    if (enc === '*') {
      wildcardQuality = quality
      return false
    }
    if (listedValues !== null && !isWildcardMatch) {
      listedValues.push(enc)
    }

    if (quality === 0 || preferredEncodingQuality > quality) {
      return false
    }

    const priority = supportedValues.indexOf(enc)
    if (priority === -1) {
      return false
    }

    if (priority === 0 && quality === 1) {
      preferredEncoding = enc
      return true
    } else if (preferredEncodingQuality < quality) {
      preferredEncoding = enc
      preferredEncodingPriority = priority
      preferredEncodingQuality = quality
    } else if (preferredEncodingPriority > priority) {
      preferredEncoding = enc
      preferredEncodingPriority = priority
      preferredEncodingQuality = quality
    }
    return false
  }

  if (parse(header, processMatch) || wildcardQuality === 0) {
    return preferredEncoding
  }

  for (let i = 0; i < supportedValues.length; ++i) {
    if (listedValues.indexOf(supportedValues[i]) === -1) {
      processMatch(supportedValues[i], wildcardQuality, true)
      break
    }
  }

  return preferredEncoding
}

const BEGIN = 0
const TOKEN = 1
const QUALITY = 2
const END = 3

function parse (header, processMatch) {
  let str = ''
  let quality
  let state = BEGIN
  for (let i = 0, il = header.length; i < il; ++i) {
    const char = header[i]

    if (char === ' ' || char === '\t') {
      continue
    } else if (char === ';') {
      if (state === TOKEN) {
        state = QUALITY
        quality = ''
      }
      continue
    } else if (char === ',') {
      if (state === TOKEN) {
        if (processMatch(str, 1)) {
          state = END
          break
        }
        state = BEGIN
        str = ''
      } else if (state === QUALITY) {
        if (processMatch(str, parseFloat(quality) || 0)) {
          state = END
          break
        }
        state = BEGIN
        str = ''
        quality = ''
      }
      continue
    } else if (
      state === QUALITY
    ) {
      if (char === 'q' || char === '=') {
        continue
      } else if (
        char === '.' ||
        char === '1' ||
        char === '0' ||
        char === '2' ||
        char === '3' ||
        char === '4' ||
        char === '5' ||
        char === '6' ||
        char === '7' ||
        char === '8' ||
        char === '9'
      ) {
        quality += char
        continue
      }
    } else if (state === BEGIN) {
      state = TOKEN
      str += char
      continue
    }
    if (state === TOKEN) {
      const prevChar = header[i - 1]
      if (prevChar === ' ' || prevChar === '\t') {
        str = ''
      }
      str += char
      continue
    }
    if (processMatch(str, parseFloat(quality) || 0)) {
      state = END
      break
    }
    state = BEGIN
    str = char
    quality = ''
  }

  if (state === TOKEN) {
    return processMatch(str, 1)
  } else if (state === QUALITY) {
    return processMatch(str, parseFloat(quality) || 0)
  }
  return state === END
}

module.exports = negotiate
module.exports.default = negotiate
module.exports.negotiate = negotiate
module.exports.Negotiator = Negotiator
