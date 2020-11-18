import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  title: '',
  content: ''
})

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case constants.SET_DETAIL:
      return state.merge({
        title: action.title,
        content: action.content,
      })
    default:
      return state
  }
}

export default reducer
