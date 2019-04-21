import React, { FunctionComponent, Fragment, Component } from 'react'
import { renderRoutes, RouteConfig } from 'react-router-config'
import { Route, Switch, NavLink, withRouter } from 'react-router-dom'

import Root from '../containers/RootContainer/RootContainer'
import LoginComponent from '../components/Entercomponent/LoginComponent/LoginComponent'
import CatalogueContainer from '../containers/CatalogueContainer/CatalogueContainer'
import ProductManagmentContainer from '../containers/ProductManagmentContainer/ProductManagmentContainer'
import RegisterProductContainer from '../containers/RegisterProductContainer/RegisterProductContainer'

import { connect } from 'react-redux'
import { getUser } from '../redux/rootReducer'

const withUser = (WrapedComponent) => {
  const UserComponent = props =>
    <WrapedComponent {...props} />

  const mapStateToProps = state => ({
    user: getUser(state),
  })

  UserComponent.defaultProps = {
    user: null,
  }

  return connect(mapStateToProps, null)(UserComponent)
}

const PrivateRoute = withUser(({ component: Component, ...rest }) => (
    rest.user ?
        <Component {...rest} />
        : <div>Loading</div>
))

const CatalogueComponentPrivate = <PrivateRoute component = {CatalogueContainer} />
const ProductManagmentContainerPrivate = <PrivateRoute component = {ProductManagmentContainer} />

const About = () => <div>
React Redux-saga boileplate with reacr-router
</div>

const NotFound = () => <div>Not Found</div>


const routes: Array<RouteConfig> = [
  {
    component: Root,
    routes: [
      { 
        path: "/",
        exact: true,
        component: LoginComponent
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/login',
        component: LoginComponent
      },
      {
        path: '/catalogue',
        component: () => CatalogueComponentPrivate
      },
      {
        path: '/productmanagment',
        component: () => ProductManagmentContainerPrivate
      },
      {
        path: '/register',
        component: RegisterProductContainer
      },
      {
        component: NotFound
      }
    ]
  }
]

export default routes
