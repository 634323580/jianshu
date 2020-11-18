import axios from 'axios'
import * as constants from './constants'
import { fromJS } from 'immutable'

const changeHomeData = (result) => {
  const { topicList, articleList, recommendList } = result
  return {
    type: constants.CHANGE_HOME_DATA,
    topicList,
    articleList,
    recommendList,
  }
}

const addHomeList = (list, nextPage) => {
  return {
    type: constants.ADD_ARTICLE_LIST,
    list: fromJS(list),
    nextPage
  }
}

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json')
    .then(res => {
      dispatch(changeHomeData(res.data.data))
    })
  }
}

export const getMoreList = (page) => {
  return (dispatch) => {
    axios.get('/api/homeList.json', {
      params: {
        page
      }
    })
    .then(res => {
      dispatch(addHomeList(res.data.data, page + 1))
    })
  }
}

export const toggleTopShow = (show) => {
  return {
    type: constants.TOGGLE_SCROLL_TOP,
    show
  }
}
