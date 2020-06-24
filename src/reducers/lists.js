
import { getUserAccess } from './auth'
import { formatCriteriaForSearch } from './search'

export const types = {
  GET_LISTS_REQUEST: 'LISTS/GET_REQUEST',
  GET_LISTS_SUCCESS: 'LISTS/GET_SUCCESS',
  GET_LISTS_FAILURE: 'LISTS/GET_FAILURE',
  GET_LIST_RECORDS_REQUEST: 'LISTS/GET_RECORDS_REQUEST',
  GET_LIST_RECORDS_SUCCESS: 'LISTS/GET_RECORDS_SUCCESS',
  GET_LIST_RECORDS_FAILURE: 'LISTS/GET_RECORDS_FAILURE',
  CREATE_LISTS_REQUEST: 'LISTS/CREATE_REQUEST',
  CREATE_LISTS_SUCCESS: 'LISTS/CREATE_SUCCESS',
  CREATE_LISTS_FAILURE: 'LISTS/CREATE_FAILURE',
  COMBINE_LISTS_REQUEST: 'LISTS/COMBINE_LISTS_REQUEST',
  COMBINE_LISTS_SUCCESS: 'LISTS/COMBINE_LISTS_SUCCESS',
  COMBINE_LISTS_FAILURE: 'LISTS/COMBINE_LISTS_FAILURE',
  DELETE_LISTS_REQUEST: 'LISTS/DELETE_REQUEST',
  DELETE_LISTS_SUCCESS: 'LISTS/DELETE_SUCCESS',
  DELETE_LISTS_FAILURE: 'LISTS/DELETE_FAILURE',
  UPDATE_LISTS_REQUEST: 'LISTS/UPDATE_REQUEST',
  UPDATE_LISTS_SUCCESS: 'LISTS/UPDATE_SUCCESS',
  UPDATE_LISTS_FAILURE: 'LISTS/UPDATE_FAILURE',
  DELETE_RECORDS_REQUEST: 'LISTS/DELETE_RECORDS_REQUEST',
  DELETE_RECORDS_SUCCESS: 'LISTS/DELETE_RECORDS_SUCCESS',
  DELETE_RECORDS_FAILURE: 'LISTS/DELETE_RECORDS_FAILURE',
  DOWNLOAD_RECORDS_REQUEST: 'LISTS/DOWNLOAD_RECORDS_REQUEST',
  DOWNLOAD_RECORDS_SUCCESS: 'LISTS/DOWNLOAD_RECORDS_SUCCESS',
  DOWNLOAD_RECORDS_FAILURE: 'LISTS/DOWNLOAD_RECORDS_FAILURE',
  STACK_REQUEST: 'LISTS/STACK_REQUEST',
  STACK_FAILURE: 'LISTS/STACK_FAILURE',
  STACK_SUCCESS: 'LISTS/STACK_SUCCESS',
  CLEAR_FILEPATH: 'LISTS/CLEAR_FILEPATH',
  CLEAR_LISTID: 'LISTS/CLEAR_LISTID',
  CLEAR_COMBOID: 'LISTS/CLEAR_COMBOID',
}

export const initialState = {
  lists: [],
  listRecords: [],
  listId: '',
  comboId: '',
  loadingRecords: false,
  filepath: '',
  error: null,
  isLoading: false
}

export const handleCreateList = (name, description, criteria, planType, num_records) => (dispatch, getState) => {
  if (!name || !criteria) { return }
  const oldState = getState()
  const query = formatCriteriaForSearch(criteria, oldState.auth.user.user_access.motivations || [])
  query.list_name = name
  query.list_description = description
  query.num_records = Number(num_records) || 0
  query.plan_type = planType || 'national'
  query.create_list = true
  query.get_count_only = false
  dispatch({
    types: [types.CREATE_LISTS_REQUEST, types.CREATE_LISTS_SUCCESS, types.CREATE_LISTS_FAILURE],
    method: 'post',
    data: {
      action: "search",
      properties: query
    },
    callback: getUserAccess()
  })
}

export const handleGetLists = () => dispatch => {
  dispatch({
    types: [types.GET_LISTS_REQUEST, types.GET_LISTS_SUCCESS, types.GET_LISTS_FAILURE],
    method: 'post',
    data: {
      action: "get_lists",
      properties: { } }
  })
}
export const handleGetListRecords = (listId, showOptOuts) => dispatch => {
  const params = { list_uuid: listId }
  if (showOptOuts) { params.opt_out_only = true }
  dispatch({
    types: [types.GET_LIST_RECORDS_REQUEST, types.GET_LIST_RECORDS_SUCCESS, types.GET_LIST_RECORDS_FAILURE],
    method: 'post',
    data: {
      action: "get_list",
      properties: params
    }
  })
}
const _refresh = (listId) => dispatch => {
  dispatch(handleGetLists())
  if (listId) {
    dispatch(handleGetListRecords(listId))
  }
}
export const handleUpdateList = (data) => dispatch => {
  dispatch({
    types: [types.UPDATE_LISTS_REQUEST, types.UPDATE_LISTS_SUCCESS, types.UPDATE_LISTS_FAILURE],
    method: 'post',
    data: {
      action: "update_list",
      properties: data
    },
    callback: _refresh(data.list_uuid)
  })
}
export const handleDeleteList = (listId) => dispatch => {
  dispatch({
    types: [types.DELETE_LISTS_REQUEST, types.DELETE_LISTS_SUCCESS, types.DELETE_LISTS_FAILURE],
    method: 'post',
    data: {
      action: "delete_lists",
      properties: { list_uuids: [listId] }
    },
    callback: handleGetLists()
  })
}
export const handleDeleteRecord = (listId, itemIds) => dispatch => {
  dispatch({
    types: [types.DELETE_RECORDS_REQUEST, types.DELETE_RECORDS_SUCCESS, types.DELETE_RECORDS_FAILURE],
    method: 'post',
    data: {
      action: "modify_record",
      properties: { 
        list_uuid: listId, 
        parcel: Array.isArray(itemIds) ? itemIds : [itemIds], 
        opt_out_list: true
      }
    },
    callback: handleGetListRecords(listId)
  })
}
export const handleDownloadList = (listId, removeDupes) => dispatch => {
  const params = { list_uuid: listId }
  if (removeDupes) {
    params.options = { dedup_addresses: true }
  }
  dispatch({
    types: [types.DOWNLOAD_RECORDS_REQUEST, types.DOWNLOAD_RECORDS_SUCCESS, types.DOWNLOAD_RECORDS_FAILURE],
    method: 'post',
    data: {
      action: "export_list",
      properties: params
    }
  })
}

export const handleCombineLists = (listId, criteria, planType, num_records) => (dispatch, getState) => {
  if (!listId || !criteria) { return }
  const oldState = getState()
  const query = formatCriteriaForSearch(criteria, oldState.auth.user.user_access.motivations || [])
  query.list_uuid = listId
  query.num_records = Number(num_records) || 0
  query.plan_type = planType || 'national'
  query.create_list = true
  query.get_count_only = false
  query.options = {suppressed_list_uuids: [listId]}
  dispatch({
    types: [types.COMBINE_LISTS_REQUEST, types.COMBINE_LISTS_SUCCESS, types.COMBINE_LISTS_FAILURE],
    method: 'post',
    data: {
      action: "search",
      properties: query
    },
    callback: getUserAccess()
  })
}

export const handleStackLists = (lists, listName) => dispatch => {
  if (!lists || lists.length < 2 || !listName) { return }
  dispatch({
    types: [types.STACK_REQUEST, types.STACK_SUCCESS, types.STACK_FAILURE],
    method: 'post',
    data: {
      action: "stack_lists",
      properties: {
        list_uuids: lists.map(x => x.value),
        list_name: listName,
        list_description: 'A Stacked list featuring ' + lists.map(x => x.label).join(', ')
      }
    },
    callback: handleGetLists()
  })
}
export const handleFileDownloaded = () => dispatch => {
  dispatch({ type: types.CLEAR_FILEPATH })
}
export const handleClearListId = () => dispatch => {
  dispatch({ type: types.CLEAR_LISTID })
}
export const handleClearCombinedListId = () => dispatch => {
  dispatch({ type: types.CLEAR_COMBOID })
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.COMBINE_LISTS_REQUEST:
    case types.CLEAR_COMBOID:
      return { ...state, error: null, comboId: '' }
    case types.COMBINE_LISTS_SUCCESS:
      if (action.data.allowance_exceeded) {
        return { ...state, isLoading: false, error: 'Requested records exceeds your remaining allowance for this billing period.  Please reduce the records requested or upgrade your plan.' }
      }
      return { ...state, isLoading: false, error: null, comboId: action.data.list_uuid }
  
    case types.CREATE_LISTS_REQUEST:
    case types.CLEAR_LISTID:
      return { ...state, error: null, listId: '' }
    case types.CREATE_LISTS_SUCCESS:
      if (action.data.allowance_exceeded) {
        return { ...state, isLoading: false, error: 'Requested records exceeds your remaining allowance for this billing period.  Please reduce the records requested or upgrade your plan.' }
      }
      return { ...state, error: null, listId: action.data.list_uuid }
    case types.GET_LIST_RECORDS_REQUEST:
    case types.DELETE_RECORDS_REQUEST:
      return { ...state, loadingRecords: true, error: null, listRecords: [] }
    case types.GET_LIST_RECORDS_SUCCESS:
      return { ...state, loadingRecords: false, error: null, listRecords: action.data || []}

    case types.STACK_REQUEST:
      return { ...state, isLoading: true, error: null }
    case types.STACK_SUCCESS:
      return { ...state, isLoading: false, error: null, listId: action.data.list_uuid }

    case types.GET_LISTS_REQUEST:
      return { ...state, isLoading: true, error: null }
    case types.GET_LISTS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        lists:  action.data || []
      }
    case types.DOWNLOAD_RECORDS_SUCCESS:
      return { ...state, isLoading: false, error: null, filepath: action.data.url }
    case types.CLEAR_FILEPATH:
      return { ...state, filepath: '' }
    case types.GET_LISTS_FAILURE:
    case types.CREATE_LISTS_FAILURE:
    case types.DELETE_LISTS_FAILURE:
    case types.DOWNLOAD_RECORDS_FAILURE:
    case types.STACK_FAILURE:
      return { ...state, isLoading: false, error: action.error }
    case types.GET_LIST_RECORDS_FAILURE:
      return { ...state, loadingRecords: false, error: action.error, listRecords: [] }
    default:
      return state
  }
}
