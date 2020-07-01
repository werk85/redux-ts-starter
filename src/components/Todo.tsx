import React from 'react'

export interface TodoStateProps {
  isChecked: boolean
  title: string
}

export interface TodoDispatchProps {
  onChange: (isChecked: boolean) => void
}

export interface TodoProps extends TodoStateProps, TodoDispatchProps {}

export const Todo: React.FC<TodoProps> = ({ isChecked, title, onChange }) => (
  <li>
    <input type="checkbox" checked={isChecked} onChange={event => onChange(event.target.checked)} />
    {title}
  </li>
)
