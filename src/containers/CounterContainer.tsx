import { RouteComponentProps } from 'react-router-dom'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { counter, root } from '../redux/modules'
import { Counter } from '../components/Counter'

export interface CounterContainerProps extends RouteComponentProps {}

export const CounterContainer: React.FC<CounterContainerProps> = () => {
  const dispatch = useDispatch()
  const state = useSelector(root.counterLens.get)

  return (
    <Counter
      counter={state}
      onDecrement={() => dispatch(counter.decrease())}
      onIncrement={() => dispatch(counter.increase())}
      onReset={() => dispatch(counter.reset())}
    />
  )
}
