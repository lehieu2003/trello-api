import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/index'

const START_SERVER = () => {
  const app = express()

  // enable json body parser (json data)
  app.use(express.json())

  // use api v1
  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello hieu, I am running at ${env.APP_HOST} and port ${env.APP_PORT}`
    )
  })

  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. MongoDB connection closed')
  })
}

// new way connecting to MongoDB Atlas by using anonymous async function (IIFE)
(
  async () => {
    try {
      console.log('1. Connecting to MongoDB Atlas...')
      await CONNECT_DB()
      console.log('2. Connected to MongoDB successfully')
      START_SERVER()
    } catch (error) {
      console.error('Error connecting to MongoDB: ', error)
      process.exit(0)
    }
  }
)()

// // connect toi MongoDB success thi moi start server
// console.log('1. Connecting to MongoDB Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB successfully'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error('Error connecting to MongoDB: ', error)
//     process.exit(0)
//   })
