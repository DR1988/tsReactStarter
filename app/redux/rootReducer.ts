import { combineReducers } from 'redux'

import user, * as fromUser from './users'
import localization, * as fromLocalization from './localization'
import products, * as fromPorducts from './products'

export const getUser = state => fromUser.getUser(state)
export const getLocale = state => fromLocalization.getLocale(state)
export const getMessages = state => fromLocalization.getMessages(state)

export const getAllProductsFromState = state => fromPorducts.getAllProducts(state)
export const getProduct = state => fromPorducts.getProduct(state)

export default combineReducers({
  user,
  localization,
  products,
})
