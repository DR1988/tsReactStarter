import { Reducer, Action } from 'redux'
import { createTypes, createActions2, createActions, handleActions } from '../utils/reduxUtils'
export const types = createTypes([
  'SET_USER',
  'LOG_OUT',
], 'USER')


const initialState = {
  fetchingUsers: false,
  keycloak: null,
}

export const actions = createActions(types)
export const selectUsers = state => state.users.users
export const getUser = state => state.user.keycloak

const reducer: Reducer = handleActions({
  [types.SET_USER]: (state, { payload }) => {
    return {
      ...state,
      keycloak: payload,
    }
  },
  [types.LOG_OUT]: (state) => {
    return {
      ...state,
      keycloak: null,
    }
  },
}, initialState)

export default reducer
