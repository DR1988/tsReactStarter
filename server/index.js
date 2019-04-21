import express from 'express'
import path from 'path'
import webpackMidlleware from './middlewares/webpack'
import staticMiddleware from './middlewares/static'
// import renderMiddleware from './middlewares/renderHTML'

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000
// const host = process.env.host ? process.env.host : 'localhost'
 /* eslint-disable no-console */

app.use(webpackMidlleware)
app.use(staticMiddleware)
// app.use(renderMiddleware)

// app.use(express.static(path.resolve(__dirname, './../')))
app.get(/.*/, (req, res) =>
     res.sendFile(path.resolve('index.html')),
)

app.listen(port, /* host,*/ (err) => {
  if (err) console.error(err)
  console.info(`SERVER: Listening at ${port}`) // eslint-disable-line no-console
})
