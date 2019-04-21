import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, types } from '../redux/localization'

export function* getLocalizationWorker({ payload }) {
  try {
    const result = require(`../localization/${payload}.js`)
    yield put(actions.getTranslationSuccess({ messages: result.default, locale: payload }))
  } catch (error) {
    console.log('getLocalizationWorker error', error)
    yield put(actions.getTranslationFailed)
  }
}

export function* getLocalizationWatcher() {
  yield takeLatest(types.GET_TRANSLATION, getLocalizationWorker)
}
