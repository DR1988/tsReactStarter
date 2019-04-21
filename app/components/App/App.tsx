import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { hot } from 'react-hot-loader/root'
import 'normalize.css'

// import Main from './../../containers/Main/Main'
import Main from './../Main/Main'


interface Props {
  store: Store
}

const App = ({ store }: Props) => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default hot(App)
