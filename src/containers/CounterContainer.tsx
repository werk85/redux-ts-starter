import { RouteComponentProps } from 'react-router-dom'
import React from 'react'
import { counter, root } from '../redux/modules'
import { Counter } from '../components/Counter'
import { connect } from './util'

export interface CounterContainerProps extends RouteComponentProps {}

export const CounterContainer = connect<CounterContainerProps>()(root.counterLens.get, dispatch => state => (
  <Counter
    counter={state}
    onDecrement={() => dispatch(counter.decrease())}
    onIncrement={() => dispatch(counter.increase())}
    onReset={() => dispatch(counter.reset())}
  />
))
