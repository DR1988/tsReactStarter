import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const middleware: Array<any> = [sagaMiddleware]
  /* if (process.env.NODE_ENV === 'development')*/
  //  middleware.push(createLogger())

  const composeEnhancers = /* window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || */ compose
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  )

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  store.runSaga = sagaMiddleware.run

  return store
}
