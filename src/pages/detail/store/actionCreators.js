import axios from 'axios'
import * as constants from './constants'

const setDetail = (title, content) => {
  return {
    type: constants.SET_DETAIL,
    title,
    content
  }
}

export const getDetail = (id) => {
  return (dispatch) => {
    axios.get('/api/detail.json', {
      params: {
        id
      }
    })
    .then(res => {
      res = res.data.data
      dispatch(setDetail(res.title, res.content))
    })
  }
}
