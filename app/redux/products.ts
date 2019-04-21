import { Reducer, Action } from 'redux'
import { createTypes, createActions, handleActions } from '../utils/reduxUtils'

export const types = createTypes([
  'GET_PRODUCTS',
  'SET_PRODUCTS',
  'ADD_PRODUCTS',
  'UPDATE_PRODUCTS'
], 'PRODUCTS')

const initialState = {
  productsTemplates: null
}

export const actions = createActions(types)
export const getAllProducts = state => state.products.productsTemplates
export const getProduct = state => state.products.productsTemplates[0]

const reducer: Reducer = handleActions({
  [types.SET_PRODUCTS]: (state, { payload }) => {
    return {
      ...state,
      productsTemplates: payload,
    }
  },
  [types.ADD_PRODUCTS]: (state, { payload }) => {
    console.log(state)
    console.log(payload)
    return {
      ...state,
      productsTemplates: [...state.productsTemplates, payload],
    }
  },
  [types.UPDATE_PRODUCTS]: (state, {payload}) => ({
    ...state,
    productsTemplates: state.productsTemplates.map(pt => pt.id === payload.id ? payload : pt),
  })
}, initialState)

export default reducer
