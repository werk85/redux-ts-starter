import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import { failure } from 'io-ts/lib/PathReporter'

export function cast<I, A>(codec: t.Decoder<I, A>): (value: I) => A {
  return value =>
    pipe(
      codec.decode(value),
      E.getOrElse<t.Errors, A>(errors => {
        throw new Error(failure(errors).join('\n'))
      })
    )
}
