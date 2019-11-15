const users = {
  resolve: payload => {
    return payload.users
  },
  subscribe: (_, __, { pubsub, subscriptions }) => {
    const { REGISTERED_USER } = subscriptions

    return pubsub.asyncIterator(REGISTERED_USER)
  },
}

export const Subscription = {
  users,
}
