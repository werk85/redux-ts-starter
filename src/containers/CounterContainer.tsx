import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { pipe } from 'fp-ts/lib/function'
import { RouteComponentProps } from 'react-router-dom'
import { counter, root } from '../redux/modules'
import { Counter, CounterStateProps, CounterDispatchProps } from '../components/Counter'

export interface CounterContainerOwnProps extends RouteComponentProps {}

function mapStateToProps(state: root.State, ownProps: CounterContainerOwnProps): CounterStateProps {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch: Dispatch<counter.Action>, ownProps: CounterContainerOwnProps): CounterDispatchProps {
  return {
    onDecrement: () => dispatch(counter.decrease()),
    onIncrement: () => dispatch(counter.increase()),
    onReset: () => dispatch(counter.reset())
  }
}

export const CounterContainer = pipe(Counter, connect(mapStateToProps, mapDispatchToProps))
