import React from 'react'
import { Link } from 'react-router-dom'
import { ProductsTemplate } from '../../../services/products.service'

import s from './CatalogItemComponent.scss'
import cs from '../../../static/commonStyles.scss'

import Button from '../../Commoncomponents/Button/Button'

interface Props {
  productsTemplate: ProductsTemplate
}

const CatalogItemComponent: React.FC<Props> = ({ productsTemplate }) => (
  <div className={s.container}>
    <div className={s.content}>
      <section>
        <h2>Описание</h2>
        <div className={s.description_content}>
          <div className={s.image_container}>
            <img src={productsTemplate.image} alt="" />
          </div>
          <div className={s.description_contaner}>
            <p>{productsTemplate.name}</p>
            <p>{productsTemplate.description}</p>
            <Link to={`/productmanagment?productId=${productsTemplate.id}`}>
              <Button>Изменить</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className={s.stat_contaner}>
        <h4>Краткая статистика по продукту</h4>
        <p>Зарегистрировано {productsTemplate.productsAmount} Qr кодов </p>
        <p>Количество считываний: {productsTemplate.scanAmount}</p>
        <Button>Подробная статистика</Button>
      </section>
    </div>
  </div>
)

export default CatalogItemComponent
