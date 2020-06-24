import axios from 'axios'
import { parser } from '../utils/parser'

export const types = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  USER_ACCESS_REQUEST: 'AUTH/USER_ACCESS_REQUEST',
  USER_ACCESS_SUCCESS: 'AUTH/USER_ACCESS_SUCCESS',
  USER_ACCESS_FAILURE: 'AUTH/USER_ACCESS_FAILURE',
  UPDATE_USER_REQUEST: 'AUTH/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'AUTH/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'AUTH/UPDATE_USER_FAILURE',
  CLEAR_UPDATE_USER: 'AUTH/CLEAR_UPDATE_USER',
  LOGOUT: 'AUTH/LOGOUT',
}

export const initialState = {
  error: null,
  isLoading: false,
  validated: false,
  userUpdated: false,
  user: null,
  token: null,
}

const isLocalHost = () => ( window.location.hostname.indexOf('localhost') >= 0 )

export const getToken = () => (dispatch) => {

  if (isLocalHost()) {
    return dispatch(getTokenForLocalhost())
  }
  dispatch({ type: types.LOGIN_REQUEST })

  const idTokenParam = parser.getParameterByName('id_token')

  if (!idTokenParam) {
    return dispatch({ type: types.LOGIN_FAILURE, error: 'Missing Token' })
  }
  dispatch({ type: types.LOGIN_SUCCESS, data: idTokenParam })
  
  //get user_access info, which will also validate the token
  dispatch(getUserAccess())
}

export const getUserAccess = () => (dispatch) => {
  dispatch({
    types: [types.USER_ACCESS_REQUEST, types.USER_ACCESS_SUCCESS, types.USER_ACCESS_FAILURE],
    method: 'post',
    data: { action: "get_user_obj" }
  })
}
//PURELY FOR LOCAL LOGIN
const getTokenForLocalhost = () => (dispatch) => {
  if (!isLocalHost()) { return }
  let config = {
      baseURL: process.env.REACT_APP_BASE_URL,
      url: '/auth',
      method: 'post',
      data: {
        "action": "auth",
        // "properties": {"a":"b"}
        "properties": {
          "username": "dan@gainsboroughtech.com",
          "password": "Tester123$",
          // "username": "dt@propertyleads.com", // inactive account
          // "password": "DesignerTest1!",
          "client_id": "1oaoeqee731oq2778pj0h8u5ae"
        }
      },
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
  }
  dispatch({ type: types.LOGIN_REQUEST })
  axios(config).then(response => {
    if (response.data.statusCode === 200) {
      console.log('RESPONSE', response.data)
      dispatch({ type: types.LOGIN_SUCCESS, data: response.data.body.AuthenticationResult.IdToken })
      //get user_access info, which will also validate the token
      dispatch(getUserAccess())
    } else {
      dispatch({ type: types.LOGIN_FAILURE, error: response })
    }
  }).catch(error => {
      console.warn('GET TOKEN ERROR', error.message)
      dispatch({ type: types.LOGIN_FAILURE, error: error.message || error.response })
  })
}
export const handleLogout = () => {
  return { type: types.LOGOUT }
}

export const handleUpdateUserInfo = user => dispatch => {
  dispatch({
    types: [types.UPDATE_USER_REQUEST, types.UPDATE_USER_SUCCESS, types.UPDATE_USER_FAILURE],
    method: 'post',
    data: {
      action: "set_user_info",
      properties: user
    },
    callback: getUserAccess()
  })
}
export const handleClearUserUpdated = () => dispatch => {
  return { type: types.CLEAR_UPDATE_USER }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_UPDATE_USER:
      return { ...state, isLoading: false, error: null, userUpdated: false }
    case types.UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, error: null, userUpdated: false }
    case types.UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, userUpdated: true }
    case types.UPDATE_USER_FAILURE:
      return { ...state, isLoading: false, error: action.error, userUpdated: false }

    case types.USER_ACCESS_REQUEST:
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null }
    case types.LOGIN_SUCCESS:
      // console.log('TOKEN', action.data)
      return { ...state, isLoading: false, token: action.data }
    case types.USER_ACCESS_SUCCESS:
      if (action.data && action.data.status === 'error') {
        return { ...state, isLoading: false, validated: false, error: action.data.message }
      }
      return { ...state, isLoading: false, validated: true, user: action.data }
    case types.USER_ACCESS_FAILURE:  
    case types.LOGIN_FAILURE:
      // console.log('FAILURE', action.type, action.error)
      return { ...state, isLoading: false, validated: false, error: action.error }
    case types.LOGOUT:
      return { ...state, ...initialState, user: null }    
    default:
      return state
  }
}
