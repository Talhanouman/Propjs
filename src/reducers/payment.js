
import { getUserAccess } from './auth'

export const types = {
  SUMMARY_REQUEST: 'PAYMENT/SUMMARY_REQUEST',
  SUMMARY_SUCCESS: 'PAYMENT/SUMMARY_SUCCESS',
  SUMMARY_FAILURE: 'PAYMENT/SUMMARY_FAILURE',
  
  GET_CARD_REQUEST: 'PAYMENT/GET_CARD_REQUEST',
  GET_CARD_SUCCESS: 'PAYMENT/GET_CARD_SUCCESS',
  GET_CARD_FAILURE: 'PAYMENT/GET_CARD_FAILURE',

  UPDATE_CARD_REQUEST: 'PAYMENT/UPDATE_CARD_REQUEST',
  UPDATE_CARD_SUCCESS: 'PAYMENT/UPDATE_CARD_SUCCESS',
  UPDATE_CARD_FAILURE: 'PAYMENT/UPDATE_CARD_FAILURE',

  COUPON_REQUEST: 'PAYMENT/COUPON_REQUEST',
  COUPON_SUCCESS: 'PAYMENT/COUPON_SUCCESS',
  COUPON_FAILURE: 'PAYMENT/COUPON_FAILURE',
  
  CHARGE_REQUEST: 'PAYMENT/CHARGE_REQUEST',
  CHARGE_SUCCESS: 'PAYMENT/CHARGE_SUCCESS',
  CHARGE_FAILURE: 'PAYMENT/CHARGE_FAILURE',

  REGIONAL_REQUEST: 'PAYMENT/REGIONAL_REQUEST',
  REGIONAL_SUCCESS: 'PAYMENT/REGIONAL_SUCCESS',
  REGIONAL_FAILURE: 'PAYMENT/REGIONAL_FAILURE',

  METRO_STATES_REQUEST: 'PAYMENT/METRO_STATES_REQUEST',
  METRO_STATES_SUCCESS: 'PAYMENT/METRO_STATES_SUCCESS',
  METRO_STATES_FAILURE: 'PAYMENT/METRO_STATES_FAILURE',

  METROS_REQUEST: 'PAYMENT/METROS_REQUEST',
  METROS_SUCCESS: 'PAYMENT/METROS_SUCCESS',
  METROS_FAILURE: 'PAYMENT/METROS_FAILURE',

  METRO_DATA_REQUEST: 'PAYMENT/METRO_DATA_REQUEST',
  METRO_DATA_SUCCESS: 'PAYMENT/METRO_DATA_SUCCESS',
  METRO_DATA_FAILURE: 'PAYMENT/METRO_DATA_FAILURE',

  UPDATE_DATASOURCE: 'PAYMENT/UPDATE_DATASOURCE'
}

export const initialState = {
  summary: null,
  payment_method: null,
  approval: null,
  cardUpdated: null,
  couponChecked: false,
  coupon: null,
  datasource: null,
  regional_states: null,
  metroStates: null,
  metros: null,
  metroData: null,
  plans: [
    { id: 'core1', name: 'Core', records: 5000, monthly: 49, annually: 490},
    { id: 'core2', name: 'Plus', records: 15000, monthly: 99, annually: 990},
    { id: 'pro', name: 'Pro', annually: 2499 },
    { id: 'skiptrace', name: 'Skip Trace', perRecord: 0.15}
  ],
  error: null,
  isLoading: false,
  isLoadingStates: false,
  isLoadingMetros: false,
  isLoadingData: false
}

export const handleGetMetroStates = () => dispatch => {
  dispatch({
    types: [types.METRO_STATES_REQUEST, types.METRO_STATES_SUCCESS, types.METRO_STATES_FAILURE],
    method: 'post',
    data: {
      action: "get_states_with_metros",
      properties: {}
    }
  })
}
export const handleGetMetrosByState = (stateId) => dispatch => {
  dispatch({
    types: [types.METROS_REQUEST, types.METROS_SUCCESS, types.METROS_FAILURE],
    method: 'post',
    data: {
      action: "get_metros_by_state",
      properties: {
        state: stateId
      }
    }
  })
}
export const handleGetMetroData = (metroId) => dispatch => {
  dispatch({
    types: [types.METRO_DATA_REQUEST, types.METRO_DATA_SUCCESS, types.METRO_DATA_FAILURE],
    method: 'post',
    data: {
      action: "get_metros_data",
      properties: {
        metro: metroId
      }
    }
  })
}
export const handleSetDatasource = (source) => dispatch => {
  dispatch({ type: types.UPDATE_DATASOURCE, data: source })
}

export const handleApplyCoupon = (coupon) => dispatch => {
  if (!coupon) {
    return dispatch({ type: types.COUPON_SUCCESS, data: {} })
  }
  dispatch({
    types: [types.COUPON_REQUEST, types.COUPON_SUCCESS, types.COUPON_FAILURE],
    method: 'post',
    data: {
      action: "check_coupon",
      properties: { code: coupon }
    }
  })
}

export const handleGetPaymentMethod = () => dispatch => {
  dispatch({
    types: [types.GET_CARD_REQUEST, types.GET_CARD_SUCCESS, types.GET_CARD_FAILURE],
    method: 'post',
    data: {
      action: "get_card_info"
    }
  })
}
export const handleUpdatePaymentMethod = (token) => dispatch => {
  dispatch({
    types: [types.UPDATE_CARD_REQUEST, types.UPDATE_CARD_SUCCESS, types.UPDATE_CARD_FAILURE],
    method: 'post',
    data: {
      action: "set_card_info",
      properties: { token }
    }, 
    callback: handleGetPaymentMethod()
  })
}

export const handleClearApproval = () => dispatch => {
  return dispatch({ type: types.CHARGE_SUCCESS, data: null })
}
export const handleSubmitSkipTraceCharge = (s3Url, mapping, token, coupon, listId, recordCount) => dispatch => {
  if (!s3Url && !listId) { return }
  const props = { }
  if (s3Url) {
    props.csv_s3_url = s3Url
    props.mapping = mapping
  }
  if (coupon) { props.code = coupon }
  if (token) { props.token = token }
  if (listId) { props.list_uuid = listId }
  props.num_submits = Number(recordCount || 1)
  dispatch({
    types: [types.CHARGE_REQUEST, types.CHARGE_SUCCESS, types.CHARGE_FAILURE],
    method: 'post',
    data: {
      action: "charge_skiptracing",
      properties: props
    },
    callback: getUserAccess()
  })
}
export const handleSubmitCharge = (planType, planId, token, mode, metro, coupon) => dispatch => {
  if (!planId) { return }
  const props = { plan_type: planType, mode: mode, plan: planId, code: coupon, metro }
  if (token) { props.token = token }
  // console.warn("CHARGE", props)
  dispatch({
    types: [types.CHARGE_REQUEST, types.CHARGE_SUCCESS, types.CHARGE_FAILURE],
    method: 'post',
    data: {
      action: "charge_subscription",
      properties: props
    },
    callback: getUserAccess()
  })
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.METRO_STATES_REQUEST:
      return { ...state, isLoadingStates: true }
    case types.METRO_STATES_SUCCESS:
      return { ...state, error: null, isLoadingStates: false, metroStates:  action.data }
    case types.METRO_STATES_FAILURE:
      return { ...state, isLoadingStates: false, error: action.error, metroStates: null }
  
    case types.METROS_REQUEST:
      return { ...state, isLoadingMetros: true }
    case types.METROS_SUCCESS:
      return { ...state, error: null, isLoadingMetros: false, metros:  action.data }
    case types.METROS_FAILURE:
      return { ...state, isLoadingMetros: false, error: action.error, metros: null }

    case types.METRO_DATA_REQUEST:
      return { ...state, isLoadingData: true }
    case types.METRO_DATA_SUCCESS:
      return { ...state, error: null, isLoadingData: false, metroData: action.data }
    case types.METRO_DATA_FAILURE:
      return { ...state, isLoadingData: false, error: action.error, metroData: null }
  
    case types.REGIONAL_SUCCESS:
      return { ...state, error: null, isLoading: false, regional_states:  action.data }
    case types.GET_CARD_SUCCESS:
      return { ...state, error: null, isLoading: false, payment_method: action.data.success ? action.data.card : null }
    case types.CHARGE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        approval: action.data,
        cardUpdated: false
      }
    case types.GET_CARD_REQUEST:
    case types.UPDATE_CARD_REQUEST:
      return { ...state, isLoading: true, cardUpdated: false }
    case types.UPDATE_CARD_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        cardUpdated: true,
        payment_method: null
      }
    case types.GET_CARD_FAILURE:
    case types.UPDATE_CARD_FAILURE:
      return { ...state, isLoading: false, cardUpdated: false, error: action.error }

    case types.COUPON_REQUEST:
      return { ...state, isLoading: true, couponChecked: false }
    case types.COUPON_SUCCESS:
        return {
          ...state,
          error: null,
          isLoading: false,
          coupon:  action.data || null,
          couponChecked: true
        }
    case types.COUPON_FAILURE:
      return { ...state, isLoading: false, error: action.error, coupon: null, couponChecked: true }
    case types.UPDATE_DATASOURCE:
      return { ...state, datasource: action.data }
    case types.SUMMARY_FAILURE:
    case types.CHARGE_FAILURE:
    case types.REGIONAL_FAILURE:
      console.warn('PAYMENT ERROR', action.error)
      return { ...state, isLoading: false, error: action.error }
    case types.SUMMARY_REQUEST:
    case types.CHARGE_REQUEST:
    case types.REGIONAL_REQUEST:
      return { ...state, isLoading: true }
    default:
      return state
  }
}
