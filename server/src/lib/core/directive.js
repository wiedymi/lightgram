import { addDirectiveResolveFunctionsToSchema } from 'graphql-directive'
import { directives } from '../directives'

const createDirective = (schema, resolver) => {
  return addDirectiveResolveFunctionsToSchema(schema, resolver)
}

export const getDirectives = schema => {
  return directives.map(({ name, resolver }) => {
    const res = { [name]: resolver }

    return {
      [name]: createDirective(schema, res),
    }
  })
}
