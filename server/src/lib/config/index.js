import dotenv from 'dotenv'

const result = dotenv.config()

const config = result.parsed

export { config }
