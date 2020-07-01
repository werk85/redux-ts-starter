import * as React from 'react'
import { BehaviorSubject } from 'rxjs'
import * as O from 'fp-ts/lib/Option'
import * as M from 'fp-ts/lib/Monoid'

export function getMonoid(): M.Monoid<JSX.Element> {
  return {
    concat: (x, y) => (
      <>
        {x}
        {y}
      </>
    ),
    empty: <></>
  }
}

export interface Ref<A> {
  provide(ref: A | null): void
  consume<B>(f: (a: A) => B): O.Option<B>
}
export function createRef<A>(): Ref<A> {
  const ref$ = new BehaviorSubject<O.Option<A>>(O.none)

  return {
    provide: ref => ref$.next(O.fromNullable(ref)),
    consume: f => O.option.map(ref$.value, f)
  }
}

export function submitForm(form: HTMLFormElement): void {
  form.dispatchEvent(new CustomEvent('submit', { bubbles: true, cancelable: true }))
}
