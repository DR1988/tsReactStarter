import axios from 'axios'

export interface TemplateChannel{
  channelId: number, // channel id to map in UI
  link: string, // goes to input in channel chosen
  productCardFlag: boolean, // isChosen
}

export interface ProductsTemplate{
  id?: number,
  name: string
  description: string,
  image: string,
  channels: Array<TemplateChannel>,
  productsAmount?: number,
  scanAmount?: number,
}

export interface iQRCode{
  productTemplateId: number,
  productIds: Array<string>,
}


// add header to queries Authorization: Bearer ${token} - get it from keycloak

export const getAllProductTemplates = () =>
  axios.get('/product-templates?include-images=true')

export const getProductTemplate = (productTemplateId: number) =>
  axios.get(`/product-templates/productId=${productTemplateId}?include-image=true`)

export const updateProductTemplate = (productTemplateId: number, productsTemplate: ProductsTemplate) =>
  axios.post(`/product-templates/productId=${productTemplateId}`, productsTemplate)

export const saveProductTemplate = (productsTemplate: ProductsTemplate) =>
  axios.post(`/product-templates`, productsTemplate)

export const getAllChannels = () => axios.get('/dictionaries?dictionary-name=CHANNELS')

export const getAllDictionaries = () => axios.get('/dictionaries/list') // dev purpose

export const makeQrCodes = (data: iQRCode) => axios.post('/products', data)