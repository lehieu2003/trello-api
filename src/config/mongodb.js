// lehieunghiahanh76
// X0PwaR0O7dYMoBo4

const MONGODB_URI =
  'mongodb+srv://lehieunghiahanh76:X0PwaR0O7dYMoBo4@cluster0-trello.snn3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-Trello';

const DATABASE_NAME = 'trello-web'

import { MongoClient, ServerApiVersion } from 'mongodb'

let trelloDatabaseInstance = null

// khoi tao 1 doi tuong de connect toi MongoDB
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  // serverApi co tu version MongoDB 5.0 tro len
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
export const CONNECT_DB = async () => {
  // goi ket not toi MongoDB Atlas voi MONGODB_URI da khai bap trng than cua mongoClientInstance
  await mongoClientInstance.connect()

  // ket noi thanh cong thi lay ra DB theo ten va gan nguoc lai vao bien trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Must connect to Database first')
  }
  return trelloDatabaseInstance
}
