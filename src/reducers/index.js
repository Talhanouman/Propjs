import { combineReducers } from 'redux'
import auth from './auth'
import lists from './lists'
import locations from './locations'
import notifications from './notifications'
import payment from './payment'
import search from './search'
import skiptracing from './skiptracing'
import support from './support'


const reducers = combineReducers({
  auth,
  lists,
  locations,
  notifications,
  payment,
  search,
  skiptracing,
  support
})

export default reducers
