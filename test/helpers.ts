import * as assert from 'assert'
import { Optional } from 'monocle-ts'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 * Assert all Optional laws
 *
 * Laws:
 * 1. getOption(s).fold(() => s, a => set(a)(s)) = s
 * 2. getOption(set(a)(s)) = getOption(s).map(_ => a)
 * 3. set(a)(set(a)(s)) = set(a)(s)
 */
export function assertOptional<S, A>({ getOption, set }: Optional<S, A>, s: S, a: A): void {
  assert.deepStrictEqual(
    pipe(
      getOption(s),
      O.fold(
        () => s,
        a => set(a)(s)
      )
    ),
    s
  )
  assert.deepStrictEqual(
    getOption(set(a)(s)),
    pipe(
      getOption(s),
      O.map(() => a)
    )
  )
  assert.deepStrictEqual(set(a)(set(a)(s)), set(a)(s))
}
