import React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { constUndefined } from 'fp-ts/lib/function'
import { root } from '../redux/modules'

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

export const connect = <OP>() => <SP>(
  mapState: (state: root.State, ownProps: OP) => SP,
  f: (dispatch: Dispatch<root.Action>, ownProps: OP) => (sp: SP) => React.ReactElement
): React.FC<OP> => props => {
  const state = useSelector<root.State, SP>(state => mapState(state, props))
  const dispatch = useDispatch()
  return f(dispatch, props)(state)
}
