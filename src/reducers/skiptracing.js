import axios from 'axios'

export const types = {
  SKIPTRACE_REQUEST: 'SKIPTRACE/REQUEST',
  SKIPTRACE_URL_SUCCESS: 'SKIPTRACE/URL_SUCCESS',
  SKIPTRACE_URL_FAILURE: 'SKIPTRACE/URL_FAILURE',
  SKIPTRACE_UPLOAD_SUCCESS: 'SKIPTRACE/UPLOAD_SUCCESS',
  SKIPTRACE_UPLOAD_FAILURE: 'SKIPTRACE/UPLOAD_FAILURE',
  SKIPTRACE_GETCOST_SUCCESS: 'SKIPTRACE/GETCOST_SUCCESS',
  SKIPTRACE_GETCOST_FAILURE: 'SKIPTRACE/GETCOST_FAILURE',
  SKIPTRACE_GETCOLUMNS_SUCCESS: 'SKIPTRACE/GETCOLUMNS_SUCCESS',
  SKIPTRACE_GETCOLUMNS_FAILURE: 'SKIPTRACE/GETCOLUMNS_FAILURE',
  SKIPTRACE_UPDATE_REQUEST_COUNT: 'SKIPTRACE/UPDATE_REQUEST_COUNT',
  SKIPTRACE_UPDATE_MAPPING: 'SKIPTRACE/UPDATE_MAPPING'
}

export const initialState = {
  signedUrl: null,
  listCost: null,
  columns: null,
  matchingFields: null,
  mapping: {},
  totalCount: null,
  requestCount: 0,
  error: null,
  isLoading: false
}

export const handleGetSignedUrl = () => dispatch => {
  dispatch({
    types: [types.SKIPTRACE_REQUEST, types.SKIPTRACE_URL_SUCCESS, types.SKIPTRACE_URL_FAILURE],
    method: 'post',
    data: {
      action: "get_s3_upload_skiptracing"
    }
  })
}
export const handleGetCost = (listId) => dispatch => {
  dispatch({
    types: [types.SKIPTRACE_REQUEST, types.SKIPTRACE_GETCOST_SUCCESS, types.SKIPTRACE_GETCOST_FAILURE],
    method: 'post',
    data: {
      action: "get_skiptracing_cost",
      properties: {
        list_uuid: listId
      }
    }
  })
}
export const handleUpdateRequestCount = (recordCount) => dispatch => {
  dispatch({ type: types.SKIPTRACE_UPDATE_REQUEST_COUNT, data: recordCount })
}
export const handleUpdateMapping = (mapping) => dispatch => {
  dispatch({ type: types.SKIPTRACE_UPDATE_MAPPING, data: mapping })
}
export const handleUploadFile = (signedUrl, file) => dispatch => {
  if (!signedUrl || !file) { return }
  // empty content-type required!!
  var options = {
    headers: {
      'Content-Type': ''
    }
  };

  dispatch({ type: types.SKIPTRACE_REQUEST })
  axios.put(signedUrl, file, options).then(response => {
    if (response && response.status === 200) {
      dispatch({
        types: [types.SKIPTRACE_REQUEST, types.SKIPTRACE_GETCOLUMNS_SUCCESS, types.SKIPTRACE_GETCOLUMNS_FAILURE],
        method: 'post',
        data: {
          action: "get_csv_columns",
          properties: {
            url: signedUrl
          }
        }
      })
    } else {
      dispatch({ type: types.SKIPTRACE_UPLOAD_FAILURE, error: response })
    }
  }).catch(error => {
      console.warn('UPLOAD ERROR', error)
      dispatch({ type: types.SKIPTRACE_UPLOAD_FAILURE, error: error.message || error.response })
  })
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SKIPTRACE_GETCOST_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        listCost: action.data || {}
      }
    case types.SKIPTRACE_URL_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        signedUrl:  action.data && action.data.url ? action.data.url : ''
      }
    case types.SKIPTRACE_GETCOLUMNS_SUCCESS:
      return { 
        ...state,
        isLoading: false,
        error: null,
        columns: action.data ? action.data.columns || [] : [],
        matchingFields: action.data ? action.data.matching_fields || [] : [],
        totalCount: action.data ? action.data.num_rows || [] : [],
        requestCount: action.data ? action.data.num_rows || [] : []
      }
    case types.SKIPTRACE_UPDATE_REQUEST_COUNT:
      return { ...state, requestCount: action.data }
    case types.SKIPTRACE_UPDATE_MAPPING:
      return { ...state, mapping: action.data }
    case types.SKIPTRACE_URL_FAILURE:
      return { ...initialState, error: action.error }
    case types.SKIPTRACE_UPLOAD_FAILURE:
    case types.SKIPTRACE_GETCOLUMNS_FAILURE:
      return { ...state, isLoading: false, columns: null, matchingFields: null, requestCount: 0, totalCount: null, listCost: null, error: action.error }
    case types.SKIPTRACE_GETCOST_FAILURE:
      return { ...state, isLoading: false, listCost: {}, error: action.error }
    case types.SKIPTRACE_REQUEST:
      return { ...state, isLoading: true, error: null, columns: null, listCost: null, matchingFields: null, requestCount: 0, totalCount: null }
    default:
      return state
  }
}
