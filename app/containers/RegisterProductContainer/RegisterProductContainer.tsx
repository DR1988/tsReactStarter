import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4';
import UuidStatic from 'uuid';
import QRCode from 'qrcode'

import { actions } from '../../redux/products'
import RegisterProductComponent, { Props as RegisterProductComponentProps } from '../../components/RegisterProductComponent/RegisterProductComponent'
import { getAllProductsFromState } from '../../redux/rootReducer'
import { ProductsTemplate, AllProductsTemplatesResponse, loadAllProductsTemplates, createQrCodes } from '../../services/products.service'

interface Props {
  productsTemplates: Array<ProductsTemplate>,
  setProducts: (productsTemplates: Array<ProductsTemplate>) => void
}
interface State extends Partial<RegisterProductComponentProps> {
  qrQuantity: number,
  chosenProductsTemplate: ProductsTemplate
}

class RegisterProductContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      qrQuantity: 5,
      chosenProductsTemplate: null,
    }
  }

  async componentDidMount() {
    const { productsTemplates, setProducts } = this.props
    if (!productsTemplates) {
      const response: AllProductsTemplatesResponse = await loadAllProductsTemplates()
      const productsTemplates = response.data
      setProducts(productsTemplates)
    }
  }

  setQuantity = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    console.log(value)
    this.setState({
      qrQuantity: +value,
    })
  }

  generateQRcodes = async () => {
    const { qrQuantity, chosenProductsTemplate } = this.state
    const uuids: Array<string> = []
    for (let i = 0; i < qrQuantity; i++) {
      uuids.push(uuidv4())
    }
    try{
      const response = await createQrCodes({
        productIds: uuids,
        productTemplateId: chosenProductsTemplate.id
      })
      if(response.status === 'ERROR'){
        throw new Error(response.message)
      } else {
        this.generate(uuids)
      }
    } catch(error){
      console.log(error)
    }
  }

  putCanvas = (child: Node) => {
    const containerCanvas = document.getElementById('containerCanvas')
    containerCanvas.appendChild(child)
  }

  generate = async (uuids: Array<string>) => {
    const { qrQuantity } = this.state
    const canvas = document.createElement("canvas");
    canvas.width  = 790
    canvas.id='canvas'
    const context = canvas.getContext('2d')
    try {
      const canvasid = document.getElementById('canvas')
      if(canvasid){
        canvasid.remove()
      }
      const arr = uuids.map(uuid => {
        return QRCode.toDataURL(`http://tl.vinorus.com/products?productId=${uuid}`, { errorCorrectionLevel: 'L' })
      })

      console.log('arr', arr)
      const qr = await Promise.all(arr)
      console.log(qr.length)
      let row = 0
      let col = 0
      const ql = qr.length
      const h = ql / 5
      canvas.height = Math.floor(h+1) * 150
      qr.forEach((q, ind) => {
        const baseImage = new Image();
        baseImage.src = q;
        baseImage.onload = () => {
          if(ind % 5 === 0 && ind !==0) {
            row++
            col = 0
          }
          context.drawImage(baseImage, 150*col, 150*row);
          col++
          this.putCanvas(canvas)
          if(qr.length -1 === ind){
            var img = canvas.toDataURL("image/png");
            var link = document.createElement("a");
            link.download = 'asdasdasd';
            link.setAttribute("href", img);
            link.click();
            // const containerCanvas = document.getElementById('containerCanvas')
            // containerCanvas.removeChild(canvas)
          }
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  selectProductsTemplate = (id: number) => {
    const { productsTemplates } = this.props
    const chosenProductsTemplate = productsTemplates.find(pt => pt.id === id)
    this.setState({
      chosenProductsTemplate,
    })
  }

  render() {
    const { productsTemplates } = this.props
    const { chosenProductsTemplate, qrQuantity } = this.state
    return (
      <Fragment>
        {productsTemplates ?
          <RegisterProductComponent
            generateQRcodes={this.generateQRcodes}
            chosenProductsTemplateId={chosenProductsTemplate && chosenProductsTemplate.id}
            selectProductsTemplate={this.selectProductsTemplate}
            productsTemplates={productsTemplates}
            setQuantity={this.setQuantity}
            qrQuantity={qrQuantity}
          />
          : null}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  productsTemplates: getAllProductsFromState(state)
})

export default connect(mapStateToProps, actions)(RegisterProductContainer)
