import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()


  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello Trung Quan Dev</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello Trung Quan Dev, I am running at ${env.APP_HOST} and port ${env.APP_PORT}`
    )
  })

  exitHook(() => {
    console.log('4. Closing MongoDB connection...')
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
