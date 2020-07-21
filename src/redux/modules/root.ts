import { Lens } from 'monocle-ts'
import { combineReducers, Reducer } from 'redux'
import { connectRouter, RouterRootState, LocationChangeAction } from 'connected-react-router'
import { merge } from 'rxjs'
import { pipe } from 'fp-ts/lib/function'
import * as Rx from 'rxjs/operators'
import { History } from 'history'
import { epic } from '../../commons'
import * as counter from './counter'
import * as todos from './todos'

export type LocationState = History.PoorMansUnknown

export type Action = counter.Action | todos.Action | LocationChangeAction<LocationState>

export interface State extends RouterRootState<LocationState> {
  counter: counter.State
  todos: todos.State
}

export const counterLens = Lens.fromProp<State>()('counter')
export const routerLens = Lens.fromProp<State>()('router')
export const todosLens = Lens.fromProp<State>()('todos')

export function createReducer(history: History<LocationState>): Reducer<State, Action> {
  return combineReducers<State>({
    counter: counter.reducer,
    router: connectRouter(history),
    todos: todos.reducer
  })
}

export interface Dependencies extends todos.Dependencies {}
export const epics = epic.create<State, Dependencies>((actions$, state$, deps) =>
  merge(
    todos.epics(actions$, pipe(state$, Rx.map(todosLens.get)), deps)
    // Add further epics here and map over the state
  )
)
