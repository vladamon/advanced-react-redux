import React from 'react'
import { connect } from 'react-redux'

export default (ChildComponent) => {
  class ComposedComponent extends React.Component {
    shouldNavigateAway = () => {
      if (!this.props.auth) {
        this.props.history.push('/')
      }
    }

    componentDidMount() {
      this.shouldNavigateAway()
    }

    componentDidUpdate() {
      this.shouldNavigateAway()
    }

    render () {
      return <ChildComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }

  return connect(mapStateToProps)(ComposedComponent)
}