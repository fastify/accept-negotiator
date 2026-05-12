import { expect } from 'tstyche'
import { Negotiator, NegotiatorOptions, negotiate } from '..'

expect(
  new Negotiator({ supportedValues: ['test' as string] })
).type.toBe<Negotiator>()
expect(
  new Negotiator({ supportedValues: ['test'] })
).type.toBe<Negotiator<'test'>>()
expect(
  new Negotiator({ supportedValues: ['test'], cache: new Map<string, string>() })
).type.toBe<Negotiator<'test'>>()
expect(Negotiator).type.not.toBeConstructableWith()
expect(
  new Negotiator({ supportedValues: ['test'] }).negotiate
).type.toBe<(header: string) => ('test' | null)>()
expect<NegotiatorOptions>().type.not.toBeAssignableFrom({
  supportedValues: [1],
  cache: new Map<string, number>()
})
expect<NegotiatorOptions>().type.not.toBeAssignableFrom({
  supportedValues: [],
  cache: new Map<string, number>()
})
expect(
  negotiate('gzip, br, deflate', ['gzip', 'deflate'] as const)
).type.toBe<'gzip' | 'deflate' | null>()
expect(
  negotiate('gzip, br, deflate', ['gzip', 'deflate'])
).type.toBe<string | null>()
expect(negotiate).type.not.toBeInstantiableWith<[number]>()
