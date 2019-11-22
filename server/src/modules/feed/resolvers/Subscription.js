import { userService, feedService } from '@/services'

const subPosts = {
  resolve: payload => {
    return payload.feed
  },
  subscribe: (_, __, { pubsub, subscriptions }) => {
    const { NEW_POST } = subscriptions

    return pubsub.asyncIterator(NEW_POST)
  },
}

const stats = {
  resolve: async () => {
    const users = await userService.count()
    const posts = await feedService.count()

    return {
      users,
      posts,
    }
  },
  subscribe: (_, __, { pubsub, subscriptions }) => {
    const { COUNT_STATS } = subscriptions

    return pubsub.asyncIterator(COUNT_STATS)
  },
}

export const Subscription = {
  subPosts,
  stats,
}
