import { SAVE_COMMENT } from './../types'
import { saveComment } from '../index'

describe('save comment', () => {
  it ('has the correct type', () => {
    const action = saveComment()

    expect(action.type).toEqual(SAVE_COMMENT)
  })

  it ('has the correct payload', () => {
    const action = saveComment('new comment')

    expect(action.payload).toEqual('new comment')
  })
})
