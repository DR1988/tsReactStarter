import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import configureStore from './redux/confStore'
import rootSaga from './saga/rootsaga'
import App from './components/App/App'

const initialState = {}
const store = configureStore(initialState)
store.runSaga(rootSaga)

const rootEl = document.getElementById('root')

ReactDOM.render(
  <Router>
    <App store={store} />
  </Router>,
  rootEl,
)
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    const NextApp = require('./components/App/App').default // eslint-disable-line global-require
    ReactDOM.render(
      <Router>
        <NextApp store={store} />
      </Router>,
      rootEl,
    )
  })

  module.hot.accept('./saga/rootsaga', () => {
    const nextRootSaga = require('./saga/rootsaga').default // eslint-disable-line global-require
    store.runSaga(nextRootSaga)
  })
}
