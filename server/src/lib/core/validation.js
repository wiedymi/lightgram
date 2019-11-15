import { validator } from 'graphql-validation'
export { validate } from 'graphql-validation'

export const createValidator = validation => {
  return resolver => validator(validation, resolver)
}
