import React, { Component, Fragment } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import s from './CatalogueComponent.scss'
import cs from '../../static/commonStyles.scss'

import { ProductsTemplate } from '../../services/products.service'

import CatalogItemComponent from './CatalogItemComponent/CatalogItemComponent'
import Button from '../Commoncomponents/Button/Button'
export interface Props {
  productsTemplates: Array<ProductsTemplate>
}

interface State {
}

class CatalogueComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    const { productsTemplates } = this.props
    return (
      <div className={cs.container}>
        <section className={s.items_container}>
          {productsTemplates.map((productsTemplate, ind) =>
            <Fragment key={productsTemplate.name}>
              { ind !== 0 ? <hr /> : null}
              <CatalogItemComponent productsTemplate={productsTemplate} />
            </Fragment>
          )}
        </section>
        <section>
          <Link to='/productmanagment?productId'>
            <Button>Добавить продукт</Button>
          </Link>
        </section>
      </div>
    )
  }
}

export default CatalogueComponent
