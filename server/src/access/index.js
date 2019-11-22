import { shield } from 'graphql-shield'
import * as resolvers from './resolvers'

export default shield(resolvers)
