import axios from 'axios'
import { getUserAccess } from './auth'

export const types = {
  SEARCH_REQUEST: 'SEARCH/REQUEST',
  SEARCH_SUCCESS: 'SEARCH/SUCCESS',
  SEARCH_FAILURE: 'SEARCH/FAILURE',
  DOWNLOAD_REQUEST: 'SEARCH/DOWNLOAD_REQUEST',
  DOWNLOAD_SUCCESS: 'SEARCH/DOWNLOAD_SUCCESS',
  DOWNLOAD_FAILURE: 'SEARCH/DOWNLOAD_FAILURE',
  CLEAR_FILEPATH: 'SEARCH/CLEAR_FILEPATH',
  USE_CODE_REQUEST: 'USE_CODES/REQUEST',
  USE_CODE_SUCCESS: 'USE_CODES/SUCCESS',
  USE_CODE_FAILURE: 'USE_CODES/FAILURE',
  DEED_TYPE_REQUEST: 'DEED_TYPES/REQUEST',
  DEED_TYPE_SUCCESS: 'DEED_TYPES/SUCCESS',
  DEED_TYPE_FAILURE: 'DEED_TYPES/FAILURE',
  CASE_TYPES_REQUEST: 'CASE_TYPES/REQUEST',
  CASE_TYPES_SUCCESS: 'CASE_TYPES/SUCCESS',
  CASE_TYPES_FAILURE: 'CASE_TYPES/FAILURE',
  UPDATE_CRITERIA: 'SEARCH/UPDATE_CRITERIA',
  UPDATE_RECORD_COUNT: 'SEARCH/UPDATE_RECORD_COUNT',
  RESET_CRITERIA: 'SEARCH/RESET_CRITERIA',
  ADD_DEFAULT_CRITERIA: 'SEARCH/ADD_DEFAULT_CRITERIA',
  DEFAULT_CRITERIA_REQUEST: 'SEARCH/DEFAULT_CRITERIA_REQUEST',
  DEFAULT_CRITERIA_SUCCESS: 'SEARCH/DEFAULT_CRITERIA_SUCCESS',
  DEFAULT_CRITERIA_FAILURE: 'SEARCH/DEFAULT_CRITERIA_FAILURE',
  UPDATE_PLAN_TYPE: 'SEARCH/UPDATE_PLAN_TYPE',
  CLEAR_ERROR: 'SEARCH/CLEAR_ERROR',
}

export const initialState = {
  criteria: {
    locations: {},
    property_info: {},
    motivations: {},
    options: {}
  },
  // criteria: {
  //   locations: {
  //     counties: [
  //       {
  //         value: 6069,
  //         label: 'Sacramento County',
  //         disabled: false,
  //         count: 1523
  //       }
  //     ]
  //   },
  //   property_info: {
  //     corporate_owned: {
  //       value: 'Not Corporate Owned',
  //       label: 'Not Corporate Owned',
  //       count: 1523
  //     },
  //     trust: {
  //       value: 'No Trust',
  //       label: 'No Trust',
  //       count: 1523
  //     }
  //   },
  //   motivations: {},
  //   options: {}
  // },

  selectedPlanType: 'national',
  searchResults: {},
  recordsRequested: 0,
  addDefaultCriteria: false,
  defaultCriteria: {},
  useCodes: [],
  filepath:  '',
  case_types: [],
  deed_types: [],
  totalCount: null,
  error: null,
  isLoading: false
}

export const handleGetDeedTypes = () => dispatch => {
  dispatch({
    types: [types.DEED_TYPE_REQUEST, types.DEED_TYPE_SUCCESS, types.DEED_TYPE_FAILURE],
    method: 'post',
    data: {
      "action": "get_normal_deed_types"
    }
  })
}
export const handleGetUseCodes = () => dispatch => {
  dispatch({
    types: [types.USE_CODE_REQUEST, types.USE_CODE_SUCCESS, types.USE_CODE_FAILURE],
    method: 'post',
    data: {
      "action": "get_normal_usecodes"
    }
  })
}
export const handleGetCaseTypes = () => dispatch => {
  dispatch({
    types: [types.CASE_TYPES_REQUEST, types.CASE_TYPES_SUCCESS, types.CASE_TYPES_FAILURE],
    method: 'post',
    data: {
      "action": "get_normal_casetypes"
    }
  })
}
export const loadingTargetedSearch = () => dispatch => {
  dispatch({ type: types.SEARCH_REQUEST })
}
export const handleGetDefaultCriteria = () => dispatch => {
  dispatch({
    types: [types.DEFAULT_CRITERIA_REQUEST, types.DEFAULT_CRITERIA_SUCCESS, types.DEFAULT_CRITERIA_FAILURE],
    method: 'post',
    data: {
      "action": "get_default_criteria"
    }
  })
}
export const handleUpdateCriteria = data => (dispatch, getState) => {
  const oldSearch = getState().search
  const oldCriteria = {...oldSearch.criteria}
  dispatch({ type: types.UPDATE_CRITERIA, data: data })
  const newCriteria = {...data}
  dispatch(handleSubmitSearch(newCriteria, oldSearch.selectedPlanType))
  if (newCriteria.locations && Object.keys(oldCriteria.locations).length === 0 && Object.keys(newCriteria.locations).length === 1) {
    dispatch({ type: types.ADD_DEFAULT_CRITERIA })
  }
  if (!newCriteria.locations || Object.keys(newCriteria.locations).length === 0) {
    dispatch({ type: types.RESET_CRITERIA })
  }
}
export const handleUpdateRecordsRequested = recordCount => dispatch => {
  dispatch({ type: types.UPDATE_RECORD_COUNT, data: recordCount })
}
export const formatCriteriaForSearch = (data, motivations) => {
  if (!data || Object.keys(data).length === 0 ||
      Object.keys(data.locations).length === 0) {
    return null
  }
  let searchQuery = {}
  if (!motivations) { motivations = [] }
  Object.keys(data).forEach(section => {
    if (Object.keys(data[section]).length === 0) { return null }
    const motivation = motivations.find(x => x.id === section)
    const appendMotivations = motivation && motivation.id
    if (appendMotivations) {
      searchQuery['motivations'] = { [section]: { ...data[section] }}
    } else {
      searchQuery[section] = { ...data[section] }
    }
    Object.keys(data[section]).forEach((group) => {
      const item = data[section][group]
      if (Array.isArray(item)) {
        const values = item.map(x => x.value)
        if (appendMotivations) {
          searchQuery['motivations'][section][group] = values
        } else { searchQuery[section][group] = values }
      } else {
        if (item.none) {
          const noneName = group + '_none'
          if (appendMotivations) {
            searchQuery['motivations'][section][noneName] = true
            delete searchQuery['motivations'][section][group]
          } else {
            searchQuery[section][noneName] = true
            delete searchQuery[section][group]
          }
        }
        if (item.min || item.max) {
          const minName = group + '_min'
          const maxName = group + '_max'
          if (appendMotivations) {
            if (item.min) { searchQuery['motivations'][section][minName] = item.min }
            if (item.max) { searchQuery['motivations'][section][maxName] = item.max }
            delete searchQuery['motivations'][section][group]
          } else {
            if (item.min) { searchQuery[section][minName] = item.min }
            if (item.max) { searchQuery[section][maxName] = item.max }
            delete searchQuery[section][group]
          }
        } else {
          if (appendMotivations) {
            searchQuery['motivations'][section][group] = item.value
          } else {
            searchQuery[section][group] = item.value
          }
        }
      }
    })
  })
  return searchQuery
}
export const getTargetedSearchCount = async (token, searchObject, planType, motivations) => {
  const searchQuery = formatCriteriaForSearch(searchObject, motivations)
  searchQuery.individual_search = true
  searchQuery.plan_type = planType || 'national'
  if (process.env.NODE_ENV === 'development') { console.log('Targeted search query', searchQuery) }
  let config = {
      baseURL: process.env.REACT_APP_BASE_URL,
      url: '',
      method: 'post',
      data: {
        "action": "search",
        "properties": searchQuery
      },
      timeout: 60000,
      headers: { 'Content-Type': 'application/json' }
    }
  config.headers['Authorization'] = token
  
  try {
    const response = await axios(config);
    // console.log("TARGETED SEARCH", response.data)
    if (response.data.statusCode === 200 && response.data.body) {
      if (process.env.NODE_ENV === 'development') { console.log('Targeted Response data', response.data); }
      return response.data.body.count;
    }
    else {
      console.warn('Search issue', response.data);
      return 0;
    }
  }
  catch (error) {
    console.warn('GET TARGETED SEARCH', error.message);
    return 0;
  }
}

export const handleSubmitSearch = (criteria, planType) => (dispatch, getState) => {
  const oldState = getState()
  const query = formatCriteriaForSearch({...criteria}, oldState.auth.user.user_access.motivations || [])
  
  if (!query) {
    // console.error('NO QUERY??', query, criteria)
    dispatch({ type: types.SEARCH_SUCCESS })
    return
  }
  query.plan_type = planType || 'national'
  
  if (process.env.NODE_ENV === 'development') { console.log('Formatted Search Query', JSON.stringify(query)) }

  dispatch({
    types: [types.SEARCH_REQUEST, types.SEARCH_SUCCESS, types.SEARCH_FAILURE],
    method: 'post',
    data: {
      "action": "search", 
      "properties": query
    }
  })
}
export const handleDownloadFile = (criteria, num_records, planType) => (dispatch, getState) => {
  if (!criteria) {
    dispatch({ type: types.CLEAR_FILEPATH })
    return
  }
  const oldState = getState()
  const query = formatCriteriaForSearch({...criteria}, oldState.auth.user.user_access.motivations || [])
  query.get_count_only = false
  query.num_records = Number(num_records) || 0
  query.plan_type = planType || 'national'
  dispatch({
    types: [types.DOWNLOAD_REQUEST, types.DOWNLOAD_SUCCESS, types.DOWNLOAD_FAILURE],
    method: 'post',
    data: {
      "action": "search", 
      "properties": query
    }, 
    callback: getUserAccess()
  })
}
export const handleUpdateSelectedPlanType = (planType) => (dispatch) => {
  dispatch({ type: types.UPDATE_PLAN_TYPE, data: planType })
}
export const handleClearError = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR, data: {} })
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_PLAN_TYPE:
      return { ...state, selectedPlanType: action.data || 'national', criteria: initialState.criteria, addDefaultCriteria: false }
    case types.UPDATE_CRITERIA:
      return { ...state, criteria: action.data, isLoading: true }
    case types.UPDATE_RECORD_COUNT:
      return { ...state, recordsRequested: action.data }
    case types.CASE_TYPES_SUCCESS:
      return { ...state, case_types: action.data }
    case types.DOWNLOAD_SUCCESS:
      if (action.data.allowance_exceeded) {
        return { ...state, isLoading: false, error: 'Requested records exceeds your remaining allowance for this billing period.  Please reduce the records requested or upgrade your plan.' }
      } 
      return { ...state, isLoading: false, filepath: action.data.url }
    case types.DEED_TYPE_SUCCESS:
      return { ...state, deed_types: action.data }  
    case types.USE_CODE_SUCCESS:
      return { ...state, useCodes: action.data }
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        searchResults: action.data || {},
        totalCount: (action.data && action.data.count ? action.data.count : 0),
        recordsRequested: (action.data && action.data.count ? action.data.count : 0)
      }
    case types.ADD_DEFAULT_CRITERIA:
      return {...state, addDefaultCriteria: true}
    case types.RESET_CRITERIA:
      return {...state, criteria: initialState.criteria, addDefaultCriteria: false}
    case types.DEFAULT_CRITERIA_SUCCESS:
      return {...state, defaultCriteria: action.data}
    case types.SEARCH_FAILURE:
    case types.CASE_TYPES_FAILURE:
    case types.DEED_TYPE_FAILURE:
    case types.USE_CODE_FAILURE:
    case types.MOTIVATIONS_FAILURE:
    case types.DOWNLOAD_FAILURE:
      return { ...state, isLoading: false, error: action.error }
    case types.CLEAR_FILEPATH:
      return { ...state, isLoading: false, filepath: '' }
    case types.CLEAR_ERROR:
      return { ...state, isLoading: false, error: null }
    case types.SEARCH_REQUEST:
    case  types.DOWNLOAD_REQUEST:
      return { ...state, isLoading: true, error: null }
    default:
      return state
  }
}
