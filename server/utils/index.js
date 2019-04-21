// http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
function searchCache(moduleName, callback) {
  let mod = require.resolve(moduleName)
  const traverse = (module) => {
    module.children.forEach((child) => {
      traverse(child)
    })
    callback(module)
  }

  if (mod && (require.cache[mod] !== undefined)) {
    mod = require.cache[mod]
    traverse(mod)
  }
}

export function purgeCache(moduleName) { // eslint-disable-line import/prefer-default-export
  searchCache(moduleName, (mod) => {
    delete require.cache[mod.id]
  })

  Object.keys(module.constructor._pathCache).forEach((cacheKey) => {
    if (cacheKey.indexOf(moduleName) > 0) {
      delete module.constructor._pathCache[cacheKey]
    }
  })
}
