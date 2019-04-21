import express from 'express'
import path from 'path'

const router = express.Router()

if (process.env.NODE_ENV === 'production') {
  router.use('/', express.static(path.resolve(__dirname, '../../dist')))
} else {
  router.use('/', express.static(path.resolve(__dirname, '../../app/static')))
}

export default router
