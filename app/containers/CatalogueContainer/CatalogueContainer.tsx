import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CatalogueComponent, { Props as CatalogueComponentProps } from '../../components/CatalogueComponent/CatalogueComponent'
import { loadAllProductsTemplates, ProductsTemplate, AllProductsTemplatesResponse } from '../../services/products.service'
import { actions } from '../../redux/products'
import { getAllProductsFromState } from '../../redux/rootReducer'

interface State {
  asyncOperaton: boolean,
}

interface Props {
  productsTemplates: Array<ProductsTemplate>,
  setProducts: (productsTemplates: Array<ProductsTemplate>) => void
}

class CatalogueContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      asyncOperaton: false,
    }
  }

  async componentDidMount() {
    const { setProducts, productsTemplates } = this.props
    if (!productsTemplates) {
      try {
        this.setState({
          asyncOperaton: true,
        })
        const response: AllProductsTemplatesResponse = await loadAllProductsTemplates()
        const productsTemplates = response.data
        setProducts(productsTemplates)
        this.setState({
          asyncOperaton: false,
        })
      } catch (error) {
        console.log(error)
        this.setState({
          asyncOperaton: false
        })
      }
    }
  }

  render() {
    const { asyncOperaton } = this.state
    const { productsTemplates } = this.props
    return (
      <Fragment>
        {productsTemplates ? <CatalogueComponent productsTemplates={productsTemplates} /> : "Loaing"}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  productsTemplates: getAllProductsFromState(state)
})

export default connect(mapStateToProps, actions)(CatalogueContainer)
