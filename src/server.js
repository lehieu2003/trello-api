import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello Trung Quan Dev</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello Trung Quan Dev, I am running at ${hostname} and port ${port}`
    )
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
