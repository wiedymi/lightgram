import uuid from 'uuid'
import { Schema } from 'mongoose'

const id = {
  type: String,
  required: true,
  unique: true,
  default: () => {
    return uuid()
  },
}

export const createSchema = (schema, ...params) => {
  return new Schema({ ...schema, id }, ...params)
}
