import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import logger from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
require('dotenv').config()

const app = express()

import apiRouter from './api/v1/api'
import customErrorHandler from './api/v1/middlewares/errorhandler.middleware'

app.use(helmet())

const allowedOrigin = [
  process.env.DEV_FRONTEND_URI,
  process.env.PROD_FRONTEND_URI,
]

var corsOptions: any = {
  origin: function (origin: string, callback: Function) {
    if (allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  preflightcontinue: true,
}

const docOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sahaj Yatra API',
      version: '1.0.0',
      description: 'None for now',
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
      },
    ],
  },
  apis: ['./src/api/v1/docs/*.yaml', './src/api/v1/routes/*.ts'],
}

const specs = swaggerJsDoc(docOptions)

app.use(cors(corsOptions))

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', apiRouter)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use('*', async (req, res) =>
  res.status(404).json({ error: 'End point not found' }),
)

app.use(customErrorHandler)

export default app
