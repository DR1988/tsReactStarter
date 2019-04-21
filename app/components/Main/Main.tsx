import React, { Component, Fragment } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'

import { addLocaleData, IntlProvider } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'
import fr from 'react-intl/locale-data/fr'

import routes from '../../routerConfg/routerConfig'
import { getLocale, getMessages } from '../../redux/rootReducer'
import { actions } from '../../redux/localization'

import './Main.scss'

addLocaleData([...enLocaleData, ...ru, ...fr ])

class Main extends Component {
  componentDidMount() {
    const { getTranslation, locale } = this.props
    getTranslation(locale)
  }
  render() {
    const { locale, messages } = this.props
    return (
      <IntlProvider key={locale} textComponent={Fragment} locale={locale} messages={messages}>
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </IntlProvider>
    )
  }
}

const mapStateToProps = state => ({
  locale: getLocale(state),
  messages: getMessages(state),
})

export default connect(mapStateToProps, actions)(Main)
