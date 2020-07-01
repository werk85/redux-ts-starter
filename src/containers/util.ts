import React from 'react'

export interface PageProps {
  onEnter: () => void
  onLeave: () => void
}
export function page<P>(component: React.FC<P>): React.FC<P & PageProps> {
  return props => {
    React.useEffect(
      () => {
        props.onEnter()
        return props.onLeave
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )
    return component(props)
  }
}
