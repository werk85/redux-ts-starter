import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import * as R from 'fp-ts/lib/Record'
import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import * as S from 'fp-ts/lib/Semigroup'
import { Prism, Lens } from 'monocle-ts'
import { _right } from 'monocle-ts/lib/Either'
import { indexRecord } from 'monocle-ts/lib/Index/Record'
import * as Rx from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { epic, todos } from '../../commons'
import { withPayloadType, createReducer, createAction } from './util'

export const loadRequest = createAction('todos/LOAD_REQUEST')
export const loadResponse = createAction('todos/LOAD_RESPONSE', withPayloadType<E.Either<todos.TodosError, Array<todos.Todo>>>())
export const change = createAction('todos/CHANGE', withPayloadType<{ id: number; isChecked: boolean }>())
export type Action = ReturnType<typeof loadRequest | typeof loadResponse | typeof change>

export interface Todo extends todos.Todo {
  isChecked: boolean
}

export type LoadedState = E.Either<todos.TodosError, Record<string, Todo>>
export type State = O.Option<LoadedState>
export const initialState: State = O.none

export const stateOptional = Prism.some<LoadedState>()
export const loadedOptional = stateOptional.composePrism(_right<todos.TodosError, Record<string, Todo>>())
export const todoById = (id: number) => loadedOptional.composeOptional(indexRecord<Todo>().index(String(id)))
export const isCheckedById = (id: number) => todoById(id).composeLens(Lens.fromProp<Todo>()('isChecked'))

export const reducer = createReducer(initialState, builder =>
  builder
    .addCase(loadResponse, (state, action) =>
      pipe(
        action.payload,
        E.map(todos =>
          R.fromFoldableMap(S.getFirstSemigroup<Todo>(), A.array)(todos, todo => [
            String(todo.id),
            {
              ...todo,
              isChecked: false
            }
          ])
        ),
        O.some
      )
    )
    .addCaseC(change, action => isCheckedById(action.payload.id).set(action.payload.isChecked))
)

export interface Dependencies extends todos.Todos {}
export const epics: epic.Epic<State, Dependencies> = (actions$, state$, { [todos.TodosURI]: api }) =>
  pipe(
    actions$,
    epic.ofType(loadRequest),
    Rx.withLatestFrom(state$, (action, state) => state),
    Rx.switchMap(todos =>
      pipe(
        todos,
        O.fold(
          // Only load when no todos were loaded before
          () => api.all,
          // Do nothing when we have already loaded tasks
          () => EMPTY
        )
      )
    ),
    Rx.map(loadResponse)
  )
