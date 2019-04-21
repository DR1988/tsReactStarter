import devConfig from './dev.config'
import prodConfig from './prod.config'

const config = Object.assign({}, process.env.NODE_ENV === 'production' ?
 { ...prodConfig } : { ...devConfig })

export default Object.freeze(config)
