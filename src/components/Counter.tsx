import React from 'react'

export interface CounterProps {
  counter: number
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
}

export const Counter: React.FC<CounterProps> = ({ counter, onIncrement, onDecrement, onReset }) => (
  <div>
    {counter}
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    <button onClick={onReset}>x</button>
  </div>
)
