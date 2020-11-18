import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { actionCreators } from './store'
import {
  LoginWrapper,
  LoginBox,
  Input,
  Button,
} from './style'

class Login extends PureComponent {
  render() {
    const { loginState, login } = this.props
    if(!loginState) {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input
              placeholder='账号'
              ref={(input) => {this.accout = input}}>
            </Input>
            <Input
              placeholder='密码'
              type='password'
              ref={(input) => {this.password = input}}>
            </Input>
            <Button onClick={() => {login(this.accout, this.password)}}>登录</Button>
          </LoginBox>
        </LoginWrapper>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapState = (state) => ({
  loginState: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => {
  return {
    login(accoutElem, passwordElem) {
      dispatch(actionCreators.login(accoutElem.value, passwordElem.value))
    }
  }
}

export default connect(mapState, mapDispatch)(Login)
