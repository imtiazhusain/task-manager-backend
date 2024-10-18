import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT,
  DATABASE_URL,
  DEBUG_MODE,
  EMAIL,
  PASS,
  ACCESS_TOKEN_SECRET,
  SERVER_URL,
  CLOUNDINARY_CLOUD_NAME,
  CLOUNDINARY_API_KEY,
  CLOUNDINARY_AP_ISECRET

} = process.env;