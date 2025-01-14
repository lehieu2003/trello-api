import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null

// khoi tao 1 doi tuong de connect toi MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // serverApi co tu version MongoDB 5.0 tro len
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
export const CONNECT_DB = async () => {
  // goi ket not toi MongoDB Atlas voi MONGODB_URI da khai bao trong than cua mongoClientInstance
  await mongoClientInstance.connect()

  // ket noi thanh cong thi lay ra DB theo ten va gan nguoc lai vao bien trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//  close ket noi toi MongoDB
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Must connect to Database first')
  }
  return trelloDatabaseInstance
}


