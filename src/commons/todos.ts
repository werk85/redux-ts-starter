import * as t from 'io-ts'
import { makeADT, ofType } from '@morphic-ts/adt'
import { Observable, of } from 'rxjs'
import * as E from 'fp-ts/lib/Either'
import { ajax } from 'rxjs/ajax'
import { pipe } from 'fp-ts/lib/function'
import * as Rx from 'rxjs/operators'
import { AType, EType } from '@morphic-ts/summoners'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { AsOpaque, summon } from './morphic'

const Todo_ = summon(F =>
  F.interface(
    {
      userId: F.number(),
      id: F.refined(F.number(), t.Int.is, 'Int'),
      title: F.string(),
      completed: F.boolean({ IoTsURI: t => withFallback(t, false) })
    },
    'Todo'
  )
)
export interface Todo extends AType<typeof Todo_> {}
export interface TodoRaw extends EType<typeof Todo_> {}
export const Todo = AsOpaque<TodoRaw, Todo>()(Todo_)

const TodoResponse_ = summon(F => F.array(Todo(F)))
export interface TodoResponse extends AType<typeof TodoResponse_> {}
export interface TodoResponseRaw extends EType<typeof TodoResponse_> {}
export const TodoResponse = AsOpaque<TodoResponseRaw, TodoResponse>()(TodoResponse_)

export interface ValidationErrors {
  _tag: 'ValidationErrors'
  errors: t.Errors
  input: unknown
}

export interface UnknownError {
  _tag: 'UnknownError'
  error: Error
}

export type TodosError = ValidationErrors | UnknownError
export const TodosError = makeADT('_tag')({
  ValidationErrors: ofType<ValidationErrors>(),
  UnknownError: ofType<UnknownError>()
})

export const TodosURI = Symbol()
export interface Todos {
  [TodosURI]: {
    all: Observable<E.Either<TodosError, TodoResponse>>
  }
}

export function mkTodos(): Todos {
  return {
    [TodosURI]: {
      all: pipe(
        ajax.getJSON('https://jsonplaceholder.typicode.com/users/1/todos'),
        Rx.map(result =>
          pipe(
            TodoResponse.type.decode(result),
            E.mapLeft(errors => TodosError.of.ValidationErrors({ errors, input: result }))
          )
        ),
        Rx.catchError(err =>
          of(
            E.left(
              TodosError.of.UnknownError({
                error: E.toError(err)
              })
            )
          )
        )
      )
    }
  }
}
