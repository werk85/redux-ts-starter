import React from 'react'
import { constUndefined } from 'fp-ts/lib/function'

export interface PageProps {
  onEnter?: () => void
  onLeave?: () => void
}
export const Page: React.FC<PageProps> = ({ children, onEnter = constUndefined, onLeave = constUndefined }) => {
  React.useEffect(
    () => {
      onEnter()
      return onLeave
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return React.createElement(React.Fragment, {}, children)
}
