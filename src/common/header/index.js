import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { Link } from 'react-router-dom'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem
} from './style.js'
// import styles from './style.module.scss'

class Header extends PureComponent {
  getListArea() {
    const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handlePageChange } = this.props
    const newList = list.toJS()
    const pageList = []
    if(newList.length) {
      for (let i = (page-1) * 10; i < Math.min(page * 10, newList.length); i++) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }

    if(focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={() => {handlePageChange(page, totalPage, this.spinIcon)}}>
              <i
                ref={(icon) => {this.spinIcon = icon}}
                className="iconfont spin">
                &#xe851;
              </i>
              换一批
          </SearchInfoSwitch>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
          </SearchInfoTitle>
        </SearchInfo>
      )
    } else {
      return null
    }
  }
  render() {
    const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props
    return (
      <HeaderWrapper>
        {/* <div className={`${styles.test} test`}>css module使用</div> */}
        <Link to="/">
          <Logo />
        </Link>
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载APP</NavItem>
          {
            login
            ?
            <NavItem onClick={logout} className="right">退出</NavItem>
            :
            <Link to='/login'>
              <NavItem className="right">登录</NavItem>
            </Link>
          }
          <NavItem className="right">
            <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={200}
              classNames="slide">
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={() => {handleInputFocus(list)}}
                onBlur={handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe614;</i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to="/wirte">
            <Button className="writting">
              <i className="iconfont">&#xe615;</i>写文章
            </Button>
          </Link>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login', 'login']),
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      if(list.size === 0) {
        dispatch(actionCreators.getList())
      }
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
    handlePageChange(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
      if(originAngle) {
        originAngle = parseInt(originAngle)
      } else {
        originAngle = 0
      }
      spin.style.transform = `rotate(${originAngle + 360}deg)`
      if(page < totalPage) {
        dispatch(actionCreators.changePage(page + 1))
      }else {
        dispatch(actionCreators.changePage(1))
      }
    },
    logout() {
      dispatch(loginActionCreators.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header)
