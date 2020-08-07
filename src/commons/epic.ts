import * as Rx from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Action } from 'redux'

export interface ActionCreator<A extends Action> {
  type: A['type']
  (...args: any[]): A
}

export function ofType<A extends Action, B extends A>(...creator: ActionCreator<B>[]): (o: Observable<A>) => Observable<B> {
  return o => o.pipe(Rx.filter((a): a is B => creator.some(creator => a.type === creator.type)))
}

export interface Epic<S, D> {
  (actions$: Observable<Action>, state$: Observable<S>, deps: D): Observable<Action>
}
