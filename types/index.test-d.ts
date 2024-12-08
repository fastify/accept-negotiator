import { expectError, expectType, expectNotAssignable } from 'tsd'
import { Negotiator, negotiate } from '.'

expectType<Negotiator>(new Negotiator({ supportedValues: ['test'] }))
expectType<Negotiator>(new Negotiator({ supportedValues: ['test'], cache: new Map<string, string>() }))
expectType<(header: string) => ('test' | null)>(new Negotiator({ supportedValues: ['test'] }).negotiate)
expectError(new Negotiator({ supportedValues: [1] }))
expectError(new Negotiator())
expectError(new Negotiator(null))
expectError(new Negotiator(undefined))
expectError(new Negotiator({ supportedValues: [], cache: new Map<string, number>() }))

expectType<'gzip' | 'deflate' | null>(negotiate('gzip, br, deflate', ['gzip', 'deflate']))
expectNotAssignable<'gzip'>(negotiate('gzip, br, deflate', ['gzip', 'deflate']))
expectError(negotiate<1>('gzip, br, deflate', ['gzip', 'deflate']))
