import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { pipe, constUndefined } from 'fp-ts/lib/function'
import { RouteComponentProps } from 'react-router-dom'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { root, todos } from '../redux/modules'
import { TodoList, TodoListDispatchProps, TodoListStateProps } from '../components/TodoList'
import { page, PageProps } from './util'

export interface TodoListContainerOwnProps extends RouteComponentProps {}

function mapStateToProps(state: root.State, ownProps: TodoListContainerOwnProps): TodoListStateProps {
  return {
    todos: pipe(state.todos, O.map(E.map(Object.values)))
  }
}

function mapDispatchToProps(
  dispatch: Dispatch<todos.Action>,
  ownProps: TodoListContainerOwnProps
): TodoListDispatchProps & PageProps {
  return {
    onEnter: () => dispatch(todos.loadRequest()),
    onLeave: constUndefined,
    onChange: (todo, isChecked) => dispatch(todos.change({ id: todo.id, isChecked }))
  }
}

export const TodoListContainer = pipe(TodoList, page, connect(mapStateToProps, mapDispatchToProps))
