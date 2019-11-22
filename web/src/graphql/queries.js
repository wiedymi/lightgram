import { createQuery } from '@/helpers'
import { QUERY } from '@/constants'

export const getUsers = createQuery(QUERY.USERS)
export const getFeed = createQuery(QUERY.FEED)
export const getDefaultStats = createQuery(QUERY.STATS)
