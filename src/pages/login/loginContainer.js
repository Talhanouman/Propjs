import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getToken } from '../../reducers/auth'
import LoginView from './loginView'

const COGNITO_URL = process.env.REACT_APP_COGNITO

function LoginContainer(props) {
  const { getToken } = props
  React.useEffect(() => {
    getToken()
  }, [getToken])
  if (props.auth.error) {
    console.warn('AUTH ERROR', props.auth.error)
    if (props.auth.error === 'Missing Token') {
      window.location = COGNITO_URL
      return
    }
  }
  return <LoginView {...props} />
}

const mapStateToProps = (state) => {
    return { auth: {...state.auth} }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
      getToken
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(LoginContainer)
