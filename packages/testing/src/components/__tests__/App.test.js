import React from 'react'
import { shallow } from 'enzyme'

import App from '../App'
import CommentBox from '../CommentBox'
import CommentList from '../CommentList'

describe('App component', () => {
  let wrapped = null

  beforeEach(() => {
    wrapped = shallow(<App />)
  })

  it('shows the comment box', () => {
    expect(wrapped.find(CommentBox).length).toEqual(1)
  })

  it('shows the comment list', () => {
    expect(wrapped.find(CommentList).length).toEqual(1)
  })
})


