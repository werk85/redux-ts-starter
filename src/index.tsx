import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import React from 'react'
import { App } from './App'
import { configureStore } from './redux/configureStore'
import { todos } from './commons'

const history = createHashHistory()

const store = configureStore(history, {
  ...todos.mkTodos()
})

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('app')
)
