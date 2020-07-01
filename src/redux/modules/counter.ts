import { createAction, createReducer } from '@reduxjs/toolkit'

export const decrease = createAction('counter/DECREASE')
export const increase = createAction('counter/INCREASE')
export const reset = createAction('counter/RESET')
export type Action = ReturnType<typeof decrease> | ReturnType<typeof increase> | ReturnType<typeof reset>

export type State = number
export const initialState: State = 0

export const reducer = createReducer(initialState, builder =>
  builder
    .addCase(decrease, state => state - 1)
    .addCase(increase, state => state + 1)
    .addCase(reset, () => 0)
)
