import { createSubscription } from '@/helpers'
import { SUBSCRIPTIONS } from '@/constants'

export const subPosts = createSubscription(SUBSCRIPTIONS.NEW_POST)
export const getStats = createSubscription(SUBSCRIPTIONS.STATS)
