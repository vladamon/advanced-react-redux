import React from 'react'
import CommentBox from './CommentBox'
import CommentList from './CommentList'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions/index'

class App extends React.Component {
  handleButtonOnClick = (value) => {
    this.props.changeAuth(!this.props.auth)
  }

  renderButton () {
    if (this.props.auth) {
      return (
        <button onClick={this.handleButtonOnClick}>Sign out</button>
      )
    } else {
      return (
        <button onClick={this.handleButtonOnClick}>Sign in</button>
      )
    }
  }

  renderHeader () {
    return (
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/comments'>Post a Comment</Link>
          </li>
          <li>
            {
              this.renderButton()
            }
          </li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderHeader()}
        <Route path='/' exact component={CommentList} />
        <Route path='/comments' component={CommentBox} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(App)
