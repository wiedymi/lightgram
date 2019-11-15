import { config } from '@/lib'

const { MONGO_DB_URL, MONGO_DB_USER, MONGO_DB_PASSWORD } = config

export const URL =
  MONGO_DB_USER.length > 0
    ? `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_URL}`
    : `mongodb://${MONGO_DB_URL}`

export const OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 100, // Reconnect every 100ms
}
