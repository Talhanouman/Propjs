import axios from 'axios';
import { handleLogout } from './reducers/auth';

const API_ROOT = process.env.REACT_APP_BASE_URL;

/*
action object
{
  types: [ACTION_PENDING, ACTION_SUCCESS, ACTION_ERROR],
  url: '/path/url',
  method: 'get',
  query: {'xyz': '123'},
  data: {email, password}
}
*/
const tokenMiddleware = store => next => action => {
    if (typeof action.types === 'undefined' || typeof action.data === 'undefined') return next(action);

    const [pendingType, successType, errorType] = action.types;
    const { auth: { token = '' } } = store.getState();

    const contentType = action.contentType || 'application/json'
    let config = {
        baseURL: API_ROOT,
        url: action.url || '',
        method: action.method || 'get',
        data: action.data || {},
        params: action.query || {},
        timeout: 60000,
        headers: { 'Content-Type': contentType }
    }
    if (process.env.NODE_ENV === 'development') { 
        console.log('Config', config)
    }
    if (token) { config.headers['Authorization'] = token }
    axios(config).then(response => {
        // console.log('RESPONSE', response)
        if (response.data.errorMessage || (response.data.body && (response.data.body.error || response.data.body.error_code))) {
            console.warn('Middleware error', response.data)
            if (response.data.body) {
                throw new Error(response.data.body.error ? response.data.body.error.errorMessage : response.data.body.error_code)
            } else {
                throw new Error(response.data.errorMessage)
            }
        }
        if (response.status && response.message && response.status !== 'success') {
            throw new Error(response.message)
        }
        next({
            type: successType,
            data: response.data.body || response.data.data
        });
        if (action.callback) { store.dispatch(action.callback) }
        return;
    }).catch((error) => {
        console.warn('Middleware action', action)
        if (token && error.message === 'Network Error') {
            return store.dispatch(handleLogout());
        }
        next({
            type: errorType,
            error: error.message
        });
        return;
    })
    // Dispatch the pending action
    if (pendingType) {
        next({ type: pendingType });
    }
};

export default tokenMiddleware;
