import React from 'react'
import QRCode from 'qrcode'
import SwipeableViews from 'react-swipeable-views'
import cn from 'classnames'

import s from './RegisterProductComponent.scss'
import cs from '../../static/commonStyles.scss'
import { ProductsTemplate } from '../../services/products.service'


export interface Props {
  productsTemplates: Array<ProductsTemplate>,
  qrQuantity: number,
  setQuantity: (event: React.FormEvent<HTMLInputElement>) => void,
  selectProductsTemplate: (id: number) => void,
  chosenProductsTemplateId: number,
  generateQRcodes: () => void,
}

var qr
const canvas = document.createElement("canvas");
canvas.width  = 790;
canvas.id='canvas'
const context = canvas.getContext('2d');

const generate = async (params = 'asdasd') => {
  try {
    const canvasid = document.getElementById('canvas')
    if(canvasid){
      canvasid.remove()
    }
    qr = await Promise.all(
      [
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
        // QRCode.toDataURL('http://tl.vinorus.com/products?productId=488a4cee-c028-43ce-b248-3822d6a48c08', { errorCorrectionLevel: 'L' }),
      ])
    console.log(qr.length)
    let row = 0
    let col = 0
    const ql = qr.length
    const h = ql / 5
    canvas.height = Math.floor(h+1) * 150
    qr.forEach((q, ind) => {
      const baseImage = new Image();
      baseImage.src = q;
      baseImage.onload = function(){
        if(ind % 5 === 0 && ind !==0) {
          row++
          col = 0
        }
        context.drawImage(baseImage, 150*col, 150*row);
        col++
        putCanvas(canvas)
        if(qr.length -1 === ind){
          var img = canvas.toDataURL("image/png");
          var link = document.createElement("a");
          link.download = 'asdasdasd';
          link.setAttribute("href", img);
          link.click();
        }
      }
    })    
  } catch (err) {
    console.error(err)
  }
}

const putCanvas = (child: Node) => {
  const containerCanvas = document.getElementById('containerCanvas')
  containerCanvas.appendChild(child)
}

const RegisterProductComponent: React.FC<Props> = ({
  productsTemplates,
  setQuantity,
  qrQuantity,
  selectProductsTemplate,
  chosenProductsTemplateId,
  generateQRcodes,
}) => (
    <div className={cs.container}>
      QR
    <section>
        <h2>Выберет продукт</h2>
        <div id="containerCanvas" />
        <section className={s.product_choser}>
          <SwipeableViews
            enableMouseEvents
            style={{
              padding: '0 30px'
            }}
            slideStyle={{
              padding: '0 10px',
            }}
          >
          {productsTemplates.map((p, ind) => (
            <div key={p.id}>
              <div
                onClick={() => selectProductsTemplate(p.id)}
                className={cn(s.image_container, {[s.isChosen]: p.id === chosenProductsTemplateId })}
              >
                <img src={p.image} />
              </div>
              <p className={s.product_name}>{p.name}</p>
            </div>
          ))}
          </SwipeableViews>
        </section>
        <h2>Укажите количество qr</h2>
        <div>
          <input value={qrQuantity} min={0} onChange={setQuantity} type="number" name="" id=""/>
        </div>
        <div>
          <button onClick={generateQRcodes}>QR gen</button>
          {/* <a href="data:application/octet-stream,field1%2Cfield2%0Afoo%2Cbar%0Agoo%2Cgai%0A">CSV</a> */}
        </div>
      </section>
    </div>
  )

export default RegisterProductComponent
