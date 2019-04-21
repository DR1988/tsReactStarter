import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, types } from '../redux/users'
import API from '../api/usersAPI'

export function* getUsersWorker(action) {
  // const result = yield call(delay, 1000, null)
  // const data = yield call([result, 'json'])
  try {
    yield call(delay, 1000, null)
    const result = yield call(API.getUsers)
    yield put(actions.getUsersSuccess(result))
  } catch (error) {
    yield put(actions.getUsersFiled)
  }
}

export function* getUsersWatcher() {
  yield takeLatest(types.GET_USERS, getUsersWorker)
}
