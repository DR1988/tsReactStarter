import React, { Component, Fragment } from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { connect } from 'react-redux'
import Keycloak from 'keycloak-js'

import RootComponent from '../../components/RootComponent/RootComponent'
import { getUser } from '../../redux/rootReducer'
import withUser from '../../components/HOC/withUser'
import { actions } from '../../redux/users'
import { environment } from '../../environment/environment'

interface Props extends RouteConfigComponentProps{
}

interface State {
  user: Keycloak.KeycloakProfile,
  authenticated: boolean,
  keycloak: Keycloak.KeycloakInstance
}

class RootContainer extends Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = {
      user: null,
      keycloak: null,
      authenticated: false,
    }
  }

  componentDidMount () {
    const { location, history, setUser } = this.props
    const keycloak = Keycloak(environment.keycloak)
    keycloak.init({onLoad: 'login-required'})
    .success(authenticated => {
      setUser(keycloak)
      const { pathname, search } = location
      if (pathname === '/') {
        history.replace('/catalogue')
      } else {
        history.replace(`${pathname}${search ? search : ''}`)
      }
      keycloak.loadUserProfile().success(user => {
        this.setState({
          user,
          keycloak: keycloak,
          authenticated: authenticated
        })
      })
    })
    .error(e => console.log('LoginComponent error', e))
  }
  
  // componentDidUpdate () {
  //   console.log(123123)
  //   if(!this.state.user) {
  //     this.props.keycloak.loadUserProfile().success(user => {
  //       this.setState({
  //         user
  //       })
  //     })
  //   }
  // }
  
  render() {
    const { user } = this.state
    return (
      <Fragment>
        {user ? <RootComponent
          user={user}
          keycloak={this.state.keycloak}
        /> : null }
        {renderRoutes(this.props.route.routes)}
      </Fragment>
    )
  }
}

// const mapStateToProps = state => ({
//   keycloak: getUser(state),
// })

export default connect(null, actions)(RootContainer)
