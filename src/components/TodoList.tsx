import React from 'react'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Todo, TodoProps } from './Todo'

export interface Todo extends Omit<TodoProps, 'onChange'> {
  id: number
}

export interface TodoListProps {
  todos: O.Option<E.Either<unknown, Array<Todo>>>
  onChange: (todo: Todo, isChecked: boolean) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onChange }) => (
  <ul>
    {pipe(
      todos,
      O.fold(
        () => <>Lade...</>,
        E.fold(
          () => <>Ein Fehler ist aufgetreten</>,
          todos => (
            <>
              {todos.map(todo => (
                <Todo key={todo.id} {...todo} onChange={isChecked => onChange(todo, isChecked)} />
              ))}
            </>
          )
        )
      )
    )}
  </ul>
)
