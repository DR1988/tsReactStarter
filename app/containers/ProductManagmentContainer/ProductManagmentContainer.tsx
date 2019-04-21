import React, { Component } from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'

import ProductManagmentComponent, { ValuesProps, MappedChannel } from '../../components/ProductManagmentComponent/ProductManagmentComponent'
import { getAllProductsFromState } from '../../redux/rootReducer'
import { actions } from '../../redux/products'
import {
  loadAllProductsTemplates,
  loadAllChannels,
  ProductsTemplate,
  AllProductsTemplatesResponse,
  AllChannelsResponse,
  Channel,
  TemplateChannel,
  refreshProductTemplate,
  createProductsTemplate,
} from '../../services/products.service'

interface State extends ValuesProps {
  asyncOperaton: boolean,
  allChannels: Array<Channel>,
}

interface Props {
  productsTemplates: Array<ProductsTemplate>,
  setProducts: (productsTemplates: Array<ProductsTemplate>) => void,
}

class ProductManagmentContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      allChannels: null,
      mappedChannls: null,
      asyncOperaton: true,
      chosenProduct: {
        channels: [],
        description: '',
        image: '',
        name: '',
      },
      nameChanging: false,
      descriptionChanging: false,
      foundChosen: false,
    }
  }

  async componentDidMount() {
    const parsed = queryString.parse(location.search)
    const { productId } = parsed
    const { setProducts } = this.props
    let { productsTemplates } = this.props
    let allChannels: Array<Channel>
    try {
      const allChannelsResponse = await loadAllChannels()
      allChannels = allChannelsResponse.data
    } catch (error) {
      console.log(error)
    }
    if (!productsTemplates) {
      const AllProductsTemplatesResponse: AllProductsTemplatesResponse = await loadAllProductsTemplates()
      productsTemplates = AllProductsTemplatesResponse.data
      setProducts(productsTemplates)
    }
    if (productId) {
      const chosenProduct = productsTemplates.find((p) => p.id === +productId)
      const { foundChosen, mappedChannls } = this.mapProductChannelsToAllChannels(chosenProduct.channels, allChannels)
      this.setState({
        chosenProduct,
        allChannels,
        mappedChannls,
        foundChosen,
      })
    } else {
      const { foundChosen, mappedChannls } = this.mapProductChannelsToAllChannels(null, allChannels)
      this.setState({
        mappedChannls,
        foundChosen,
        allChannels,
      })
      console.log('no product')
    }
  }

  mapProductChannelsToAllChannels = (productChannels: Array<TemplateChannel> | null, channels: Array<Channel>) => {
    // productChannels - counld be empty =>  lenght = 0
    let foundChosen = false
    let mappedChannls: Array<MappedChannel> = []
    if (!productChannels || productChannels.length === 0) {
      channels.forEach(ch => {
        mappedChannls.push({
          ...ch,
          isChosen: false,
          link: '',
        })
      })
    } else {
      channels.forEach((ch, ind) => {
        productChannels.forEach((pc) => {
          if (!foundChosen) {
            foundChosen = pc.channelId === ch.id && pc.productCardFlag
          }
          if (ch.id === pc.channelId) {
            mappedChannls[ind] = {
              host: ch.host,
              id: ch.id,
              isChosen: pc.productCardFlag,
              link: pc.link,
              name: ch.name
            }
          } else {
            if (!mappedChannls[ind]) {
              mappedChannls[ind] = {
                host: ch.host,
                id: ch.id,
                isChosen: false,
                link: '',
                name: ch.name
              }
            }
          }
        })
      })
    }
    const mappedwithChosen = {
      mappedChannls,
      foundChosen,
    }
    return mappedwithChosen
  }

  changeName = () => this.setState({ nameChanging: true, })
  changeDescription = () => this.setState({ descriptionChanging: true })

  saveChanges = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    if (value.trim() !== '') {
      this.setState({
        chosenProduct: {
          ...this.state.chosenProduct,
          [name]: value.trim()
        },
        [`${name}Changing`]: false,
      } as Pick<State, 'chosenProduct' | 'nameChanging' | 'descriptionChanging'>)
    } else {
      this.setState({
        [`${name}Changing`]: false,
      } as any)
    }
  }

  changeImage = (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget
    if (files.length === 0) return
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const image = reader.result.toString()
      this.setState({
        chosenProduct: {
          ...this.state.chosenProduct,
          image,
        }
      })
    }
  }

  changeLink = (e: React.FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget
    const { allChannels, mappedChannls } = this.state
    const channel = allChannels.find(ch => ch.name === name)
    if (channel) {
      mappedChannls.forEach(mc => {
        if (mc.id === channel.id) {
          mc.isChosen = true
        } else {
          mc.isChosen = false
        }
      })
      this.setState({
        mappedChannls,
        foundChosen: true,
      })
    } else {
      this.setState({
        foundChosen: false,
      })
    }
  }

  save = async () => {
    const parsed = queryString.parse(location.search)
    const { productId } = parsed
    const { mappedChannls, chosenProduct, allChannels } = this.state
    if (productId) {
      const extractedChannles: Array<TemplateChannel> = mappedChannls.map(mc => ({
        channelId: mc.id,
        link: mc.link,
        productCardFlag: mc.isChosen,
      }))
      chosenProduct.channels = extractedChannles
      try {
        console.log(chosenProduct)
        const productsTemplate = await refreshProductTemplate(+productId, chosenProduct)
        console.log(productsTemplate)
        this.props.updateProducts(productsTemplate)
        const { foundChosen, mappedChannls } = this.mapProductChannelsToAllChannels(productsTemplate.channels, allChannels)
        this.setState({
          mappedChannls,
          foundChosen,
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      const extractedChannles: Array<TemplateChannel> = mappedChannls.map(mc => ({
        channelId: mc.id,
        link: mc.link,
        productCardFlag: mc.isChosen,
      }))
      chosenProduct.channels = extractedChannles
      try {
        const productsTemplate = await createProductsTemplate(chosenProduct)
        const { foundChosen, mappedChannls } = this.mapProductChannelsToAllChannels(productsTemplate.channels, allChannels)
        this.props.addProducts(productsTemplate)
        this.setState({
          mappedChannls,
          foundChosen,
        })
      } catch (error) {
        console.log(error)
      }
      console.log('new product')
    }
  }

  changeLinkValue = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    const { mappedChannls } = this.state
    this.setState({
      mappedChannls: mappedChannls.map(mc => mc.name === name ? { ...mc, link: value } : mc),
    })
  }

  render() {
    return <ProductManagmentComponent
      save={this.save}
      changeName={this.changeName}
      changeDescription={this.changeDescription}
      changeImage={this.changeImage}
      changeLink={this.changeLink}
      saveChanges={this.saveChanges}
      changeLinkValue={this.changeLinkValue}
      chosenProduct={this.state.chosenProduct}
      {...this.state}
    />
  }
}

const mapStateToProps = state => ({
  productsTemplates: getAllProductsFromState(state)
})

export default connect(mapStateToProps, actions)(ProductManagmentContainer)
