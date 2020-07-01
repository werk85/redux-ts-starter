import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { CounterContainer, TodoListContainer } from './containers'
import { Navigation } from './components/Navigation'

export function withLayout<P>(Component: React.FC<P>): React.FC<P> {
  return props => (
    <>
      <Navigation home="#/home" links="#/links" />
      <Container>
        <Component {...props} />
      </Container>
    </>
  )
}

export interface AppProps {
  history: History
}
export const App: React.FC<AppProps> = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" component={withLayout(CounterContainer)} />
      <Route path="/links" component={withLayout(TodoListContainer)} />
    </Switch>
  </ConnectedRouter>
)
