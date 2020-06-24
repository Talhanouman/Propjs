
export const types = {
  STATE_DETAIL_REQUEST: 'STATES/DETAIL_REQUEST',
  STATE_DETAIL_SUCCESS: 'STATES/DETAIL_SUCCESS',
  STATE_DETAIL_FAILURE: 'STATES/DETAIL_FAILURE',
  STATES_GET_REQUEST: 'STATES/GET_REQUEST',
  STATES_GET_SUCCESS: 'STATES/GET_SUCCESS',
  STATES_GET_FAILURE: 'STATES/GET_FAILURE'
}

export const initialState = {
  stateList: [],
  stateDetail: {},
  error: null,
  isLoading: false
}

export const handleGetAvailableStates = (planType) => dispatch => {
  dispatch({
    types: [types.STATES_GET_REQUEST, types.STATES_GET_SUCCESS, types.STATES_GET_FAILURE],
    method: 'post',
    data: { 
      action: "get_available_states",
      properties: {
        plan_type: planType
      }
    }
  })
}
export const handleGetStateDetail = (stateId, planType) => dispatch => {
  if (!stateId || stateId.toLowerCase() === 'none') { return }
  dispatch({
    types: [types.STATE_DETAIL_REQUEST, types.STATE_DETAIL_SUCCESS, types.STATE_DETAIL_FAILURE],
    method: 'post',
    data: {
      action: "get_available_state",
      properties: { 
        state: stateId,
        plan_type: planType
      }
    }
  })
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.STATES_GET_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        stateList:  action.data || []
      } 
    case types.STATE_DETAIL_SUCCESS:
        return {
          ...state,
          error: null,
          isLoading: false,
          stateDetail:  action.data || {}
        }
    case types.STATE_DETAIL_FAILURE:
    case types.STATES_GET_FAILURE:
      return { ...state, isLoading: false, error: action.error }
    case types.STATE_DETAIL_REQUEST:
    case types.STATES_GET_REQUEST:
      return { ...state, isLoading: true, error: null }
    default:
      return state
  }
}
