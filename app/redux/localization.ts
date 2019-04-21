import { createTypes, createActions, handleActions } from '../utils/reduxUtils'

export const types = createTypes([
  'GET_TRANSLATION',
  'GET_TRANSLATION_SUCCESS',
  'GET_TRANSLATION_FAIL',
], 'LOCAL')

const navigatorLocale = (navigator.languages && navigator.languages[0]) ||
                navigator.language ||
                navigator.userLanguage
const languageWithoutRegionCode = navigatorLocale.toLowerCase().split(/[_-]+/)[0]

const getInitialLocale = () => {
  const { hostname } = window.location
  const TLD = hostname.split('.').pop()
  if (TLD.toLocaleLowerCase() === 'ge') {
    return 'ka'
  }
  return JSON.parse(localStorage.getItem('localization')) || languageWithoutRegionCode || 'en'
}

const initialState = {
  locale: getInitialLocale(),
}

export const actions = createActions(types)
export const getLocale = state => state.localization.locale
export const getMessages = state => state.localization.messages

const reducer = handleActions({
  [types.GET_TRANSLATION_SUCCESS]: (state, { payload }) => {
    const { locale, messages } = payload
    localStorage.setItem('localization', JSON.stringify(locale))
    return {
      ...state,
      locale,
      messages,
    }
  },
  [types.GET_TRANSLATION_FAIL]: (state, { payload }) => {
    return {
      ...state,
    }
  },
}, initialState)

export default reducer

