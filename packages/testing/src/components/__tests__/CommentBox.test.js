import React from 'react'
import CommentBox from '../CommentBox'

import Root from './../../Root'

import { mount } from 'enzyme'

describe('CommentBox', () => {
  let wrapped = null

  beforeEach(() => {
    wrapped = mount(
      <Root>
        <CommentBox />
      </Root>
    )
  })

  afterEach(() => {
    wrapped.unmount()
  })

  it('has a text area and 2 buttons', () => {
    expect(wrapped.find('textarea').length).toEqual(1)
    expect(wrapped.find('button').length).toEqual(2)
  })

  describe('textarea', () => {
    beforeEach(() => {
      wrapped.find('textarea').simulate('change', {
        target: {
          value: 'new comment'
        }
      })

      wrapped.update()
    })

    it('has a textarea that users can type in', () => {
      expect(wrapped.find('textarea').prop('value')).toEqual('new comment')
    })

    it('has been emptied out after user submits', () => {
      expect(wrapped.find('textarea').prop('value')).toEqual('new comment')

      wrapped.find('form').simulate('submit')

      wrapped.update()
      expect(wrapped.find('textarea').prop('value')).toEqual('')
    })
  })
})
