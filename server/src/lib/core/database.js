import mongoose from 'mongoose'
import { DATABASE } from '@/constants'

const { URL, OPTIONS } = DATABASE

export const initDB = () => {
  mongoose.connect(URL, OPTIONS)
  mongoose.connection.on('error', err => {
    console.log(err)
  })
}
