import React, { Fragment } from 'react'
import cn from 'classnames'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import s from './RootComponent.scss'
import cs from '../../static/commonStyles.scss'

import Button from '../Commoncomponents/Button/Button'

interface Props extends RouteComponentProps {
  keycloak: Keycloak.KeycloakInstance,
  user: Keycloak.KeycloakProfile
}

const RootComponent: React.FC<Props> = ({ keycloak, match, history, user }) => {
  // console.log(match)
  return (
    <Fragment>
      <header className={s.root}>
        <section className={cn(cs.container, cs.container_flexed_spaced)}>
          <nav>
            <button
              onClick={() => {
                history.replace('/')
                keycloak.logout()
              }}
            >{`${user.firstName} ${user.lastName}`}</button>
          </nav>
        </section>
      </header>
      <section className={cn(cs.container)}>
        <div className={s.button_content}>
          <Link to="/about" >
            <Button>
              <FormattedMessage
                id="rootpage.button.main"
                defaultMessage="rootpage.button.main"
              />
            </Button>
          </Link>
          {/* <Link to="/about" >
            <Button>
              <FormattedMessage
                id="rootpage.button.reports"
                defaultMessage="rootpage.button.reports"
              />
            </Button>
          </Link> */}
          <Link to="/catalogue" >
            <Button>
              <FormattedMessage
                id="rootpage.button.catalogue"
                defaultMessage="rootpage.button.catalogue"
              />
            </Button>
          </Link>
          <Link to="/register" >
            <Button>
              <FormattedMessage
                id="rootpage.button.QRgenerator"
                defaultMessage="rootpage.button.QRgenerator"
              />
            </Button>
          </Link>
          <Link to="/productmanagment" >
            <Button>
              <FormattedMessage
                id="rootpage.button.productManagment"
                defaultMessage="rootpage.button.productManagment"
              />
            </Button>
          </Link>
          {/* <Link to="/about" >
            <Button>
              <FormattedMessage
                id="rootpage.button.profile"
                defaultMessage="rootpage.button.profile"
              />
            </Button>
          </Link> */}
        </div>
      </section>
    </Fragment>
  )
}

export default withRouter(RootComponent)
