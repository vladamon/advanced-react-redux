import commentsReducer from '../comments'
import { SAVE_COMMENT } from '../../actions/types'

it('handles actions of type SAVE_COMMENT', () => {
  const action = {
    type: SAVE_COMMENT,
    payload: 'new comment'
  }

  const newState = commentsReducer([], action)

  expect(newState).toEqual(['new comment'])
})

it('causes no error on unknow action', () => {
  const action = {
    type: 'dummy_type',
    payload: 'dummy'
  }

  const newState = commentsReducer([], action)
  expect(newState).toEqual([])
})
