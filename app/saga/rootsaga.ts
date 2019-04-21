import { all, fork } from 'redux-saga/effects'
import { getUsersWatcher } from './users'
import { getLocalizationWatcher } from './localization'

export default function* rootSaga() {
  yield all([
    fork(getLocalizationWatcher),
  ])
}
