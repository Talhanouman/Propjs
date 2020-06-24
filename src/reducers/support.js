
export const types = {
  SERVICE_REQUEST: 'SUPPORT/SERVICE_REQUEST',
  SERVICE_SUCCESS: 'SUPPORT/SERVICE_SUCCESS',
  SERVICE_FAILURE: 'SUPPORT/SERVICE_FAILURE'
}

export const initialState = {
  requestSent: false,
  error: null,
  isLoading: false
}

export const handleSendServiceRequest = (message) => dispatch => {
  dispatch({
    types: [types.SERVICE_REQUEST, types.SERVICE_SUCCESS, types.SERVICE_FAILURE],
    method: 'post',
    data: { 
      action: "service_request",
      properties: {
        type: "regional_data_request",
        data: message
      }
    }
  })
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SERVICE_REQUEST:
      return { ...state, error: null, isLoading: true, requestSent: false } 
    case types.SERVICE_SUCCESS:
      return { ...state, error: null, isLoading: false, requestSent: true } 
    case types.SERVICE_FAILURE:
      return { ...state, error: action.error, isLoading: false, requestSent: false } 
    default:
      return state
  }
}
