import React from 'react'

import s from './ProductManagmentComponent.scss'
import cs from '../../static/commonStyles.scss'

import DefaultImage from '../../static/images/download.png'
import Button from '../Commoncomponents/Button/Button'
import { ProductsTemplate, Channel } from '../../services/products.service'

export type MappedChannel = {
  id: number,
  name: string
  host: string,
  isChosen: boolean,
  link: string,
}

export interface ValuesProps {
  chosenProduct?: ProductsTemplate,
  mappedChannls: Array<MappedChannel>,
  foundChosen: boolean,
  nameChanging: boolean,
  descriptionChanging: boolean,
}

interface Props extends ValuesProps {
  save: () => void,
  changeName: () => void,
  changeDescription: () => void,
  changeImage: (e: React.FormEvent<HTMLInputElement>) => void,
  changeLink: (e: React.FormEvent<HTMLInputElement>) => void,
  saveChanges: (event: React.FormEvent<HTMLInputElement>) => void,
  changeLinkValue: (e: React.FormEvent<HTMLInputElement>) => void,
}

const ProductManagmentComponent: React.FC<Props> = ({
  changeName,
  nameChanging,
  changeImage,
  changeDescription,
  descriptionChanging,
  saveChanges,
  changeLink,
  changeLinkValue,
  chosenProduct,
  mappedChannls,
  foundChosen,
  save,
}) => {
  // console.log('foundChosen', foundChosen)
  return (
    <div className={cs.container}>
      <section>
        <div className={s.name_container}>
          {
            !nameChanging ?
              <h2 onClick={changeName}>{chosenProduct.name || 'Нажмите для изменения имени'}</h2> :
              <input
                defaultValue={chosenProduct.name}
                name="name"
                autoFocus
                onBlur={saveChanges}
                type="text"
                className={s.input_text}
              />
          }
        </div>
        <div>
          <div className={s.image_container}>
            <label htmlFor="imgLoader">
              <img className={s.image_content} src={chosenProduct.image || DefaultImage} alt="productImage" />
              <input
                onChange={changeImage}
                className={s.imgLoader}
                type="file"
                name=""
                id="imgLoader"
              />
            </label>
          </div>
        </div>

        <div>
          {
            !descriptionChanging ?
              <p onClick={changeDescription}>{chosenProduct.description || 'Нажмите для изменения Описание продукта'}</p> :
              <input
                defaultValue={chosenProduct.description}
                autoFocus
                name="description"
                onBlur={saveChanges}
                type="text"
                className={s.input_text}
              />
          }
        </div>
      </section>
      <section>
        <h2>Настройка каналов взаимодействия</h2>
        <div className={s.choser_container} >
          <label htmlFor="weblink">web-ссылка</label>
          <h3 className={s.input_text}>Карточка продукта</h3>
          {/* <input defaultValue={"weblink"} onBlur={changeLinkValue} name="weblink" className={s.input_text} type="text" /> */}
          <input onChange={changeLink} checked={!foundChosen} type="radio" value="weblink" name="weblink" id="weblink" />
        </div>
        {mappedChannls && mappedChannls.map(channel => (
          <div key={channel.id} className={s.choser_container} >
            <label htmlFor={channel.name}>{channel.host}</label>
            <input defaultValue={channel.link} onBlur={changeLinkValue} name={channel.name} className={s.input_text} type="text" />
            <input onChange={changeLink} checked={foundChosen && channel.isChosen} type="radio" value={channel.name} name={channel.name} id={channel.name} />
          </div>
        )
        )}
      </section>
      <Button onClick={save}>
        Сохранить
      </Button>
    </div>
  )
}

export default ProductManagmentComponent
