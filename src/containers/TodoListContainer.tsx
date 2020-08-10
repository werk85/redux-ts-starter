import { pipe } from 'fp-ts/lib/function'
import { RouteComponentProps } from 'react-router-dom'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todos, root } from '../redux/modules'
import { TodoList } from '../components/TodoList'
import { Page } from './util'

export interface TodoListContainerProps extends RouteComponentProps {}

export const TodoListContainer1: React.FC<TodoListContainerProps> = props => {
  const dispatch = useDispatch()
  const state = useSelector(root.todosLens.get)

  const items = pipe(state, O.map(E.map(todos => Object.values(todos))))
  return (
    <Page onEnter={() => dispatch(todos.loadRequest())}>
      <TodoList {...props} todos={items} onChange={(todo, isChecked) => dispatch(todos.change({ id: todo.id, isChecked }))} />
    </Page>
  )
}
