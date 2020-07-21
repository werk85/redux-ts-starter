import React from 'react'

export interface TodoProps {
  isChecked: boolean
  title: string
  onChange: (isChecked: boolean) => void
}

export const Todo: React.FC<TodoProps> = ({ isChecked, title, onChange }) => (
  <li>
    <input type="checkbox" checked={isChecked} onChange={event => onChange(event.target.checked)} />
    {title}
  </li>
)
