
export const types = {
  NOTIFICATIONS_REQUEST: 'NOTIFICATIONS/REQUEST',
  NOTIFICATIONS_SUCCESS: 'NOTIFICATIONS/SUCCESS',
  NOTIFICATIONS_FAILURE: 'NOTIFICATIONS/FAILURE',
  NOTIFICATIONS_READ_REQUEST: 'NOTIFICATIONS/READ_REQUEST',
  NOTIFICATIONS_READ_SUCCESS: 'NOTIFICATIONS/READ_SUCCESS',
  NOTIFICATIONS_READ_FAILURE: 'NOTIFICATIONS/READ_FAILURE',
}

export const initialState = {
  list: [],
  error: null,
  isLoading: false
}

export const handleGetNotifications = () => dispatch => {
  dispatch({
    types: [types.NOTIFICATIONS_REQUEST, types.NOTIFICATIONS_SUCCESS, types.NOTIFICATIONS_FAILURE],
    method: 'post',
    data: {
      action: "get_user_notifications",
      properties: {}
    }
  })
}
export const handleMarkNotificationsRead = (notificationsIds) => dispatch => {
  dispatch({
    types: [types.NOTIFICATIONS_READ_REQUEST, types.NOTIFICATIONS_READ_SUCCESS, types.NOTIFICATIONS_READ_FAILURE],
    method: 'post',
    data: {
      action: "set_user_notifications_read",
      properties: {
        notification_ids: notificationsIds
      }
    },
    callback: handleGetNotifications()
  })
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          error: null,
          isLoading: false,
          list:  action.data || []
        }
    case types.NOTIFICATIONS_FAILURE:
      return { ...state, isLoading: false, list: [], error: action.error }
    case types.NOTIFICATIONS_REQUEST:
      return { ...state, isLoading: true }
    default:
      return state
  }
}
