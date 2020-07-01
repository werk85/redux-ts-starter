import { Action, createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { History } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { root } from './modules'

export function configureStore(history: History, dependencies: root.Dependencies) {
  const epicMiddleware = createEpicMiddleware<Action, Action, root.State, root.Dependencies>({ dependencies })

  const store = createStore(
    root.createReducer(history),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), epicMiddleware))
  )

  epicMiddleware.run(root.epics)

  return store
}
