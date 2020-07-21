import { Action, Reducer } from 'redux'
import { Endomorphism } from 'fp-ts/lib/function'

export { createAction } from '@reduxjs/toolkit'

export interface CaseReducer<S, A> {
  (state: S, action: A): S
}

export interface CurriedCaseReducer<S, A> {
  (action: A): Endomorphism<S>
}

export interface TypedActionCreator<T extends string> {
  (...args: any[]): Action<T>
  type: T
}

export interface ActionHandlerBuilder<S> {
  addCase<AC extends TypedActionCreator<string>>(
    actionCreator: AC,
    reducer: CaseReducer<S, ReturnType<AC>>
  ): ActionHandlerBuilder<S>
  addCaseC<AC extends TypedActionCreator<string>>(
    actionCreator: AC,
    reducer: CurriedCaseReducer<S, ReturnType<AC>>
  ): ActionHandlerBuilder<S>
}

export function createReducer<S>(initialState: S, f: (builder: ActionHandlerBuilder<S>) => void): Reducer<S, Action> {
  const handlers: Record<string, CaseReducer<S, any>> = {}
  const builder: ActionHandlerBuilder<S> = {
    addCase: (creator, reducer) => {
      handlers[creator.type] = reducer
      return builder
    },
    addCaseC: (creator, reducer) => {
      handlers[creator.type] = (state, action) => reducer(action)(state)
      return builder
    }
  }

  f(builder)

  return function reducer(state = initialState, action: Action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}
