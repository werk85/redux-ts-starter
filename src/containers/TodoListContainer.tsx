import { pipe } from 'fp-ts/lib/function'
import { RouteComponentProps } from 'react-router-dom'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import React from 'react'
import { todos } from '../redux/modules'
import { TodoList } from '../components/TodoList'
import { connect, Page } from './util'

export interface TodoListContainerOwnProps extends RouteComponentProps {}

export const TodoListContainer = connect<TodoListContainerOwnProps>()(
  state => pipe(state.todos, O.map(E.map(Object.values))),
  (dispatch, props) => items => (
    <Page onEnter={() => dispatch(todos.loadRequest())}>
      <TodoList {...props} todos={items} onChange={(todo, isChecked) => dispatch(todos.change({ id: todo.id, isChecked }))} />
    </Page>
  )
)
