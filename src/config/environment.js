import 'dotenv/config'

export const env = {
  APP_PORT: process.env.APP_PORT || 8017,
  APP_HOST: process.env.APP_HOST || 'localhost',
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME
}