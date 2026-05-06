import { expect } from 'tstyche'
import { Negotiator, negotiate } from '..'

type NegotiatorOptions = {
  supportedValues: string[];
  cache?: {
    set: (key: string, value: string) => any;
    get: (key: string) => string | undefined;
    has: (key: string) => boolean;
  };
}

type NegotiateMethod = (header: string) => 'test' | null
type NegotiateResult = 'gzip' | 'deflate' | null

expect(
  new Negotiator({ supportedValues: ['test' as string] })
).type.toBe<Negotiator>()

expect(
  new Negotiator({ supportedValues: ['test'] }).negotiate
).type.toBe<NegotiateMethod>()

expect({ supportedValues: [1] }).type.not.toBeAssignableTo<NegotiatorOptions>()

// @ts-expect-error Expected 1 arguments, but got 0.
expect(new Negotiator()).type.toBe<Negotiator>()

expect(null).type.not.toBeAssignableTo<NegotiatorOptions>()
expect(undefined).type.not.toBeAssignableTo<NegotiatorOptions>()

expect({
  supportedValues: [],
  cache: new Map<string, number>()
}).type.not.toBeAssignableTo<NegotiatorOptions>()

expect(
  negotiate('gzip, br, deflate', ['gzip', 'deflate'] as const)
).type.toBe<NegotiateResult>()

expect(
  negotiate('gzip, br, deflate', ['gzip', 'deflate'])
).type.not.toBeAssignableTo<'gzip'>()

expect(
  // @ts-expect-error Type 'number' does not satisfy the constraint 'string'.
  negotiate<1>('gzip, br, deflate', ['gzip', 'deflate'])
).type.not.toBe<1>()
