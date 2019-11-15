export const setRateLimiter = (mongoConn, opts = {}) => ({
  storeClient: mongoConn,
  points: 10000, // Number of points
  duration: 1,
  ...opts,
})
