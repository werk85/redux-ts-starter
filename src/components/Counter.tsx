import React from 'react'

export interface CounterStateProps {
  counter: number
}

export interface CounterDispatchProps {
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
}

export interface CounterProps extends CounterStateProps, CounterDispatchProps {}

export const Counter: React.FC<CounterProps> = ({ counter, onIncrement, onDecrement, onReset }) => (
  <div>
    {counter}
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    <button onClick={onReset}>x</button>
  </div>
)
