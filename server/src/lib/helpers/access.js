import { rule } from 'graphql-shield'

export const createRole = (roles, callback = false, options = { cache: 'contextual' }) => {
  let cb = async (parent, args, ctx, info, role = roles) => {
    return ctx.user.role === role
  }
  if (callback) {
    cb = (parent, args, ctx, info, role = roles) => {
      const result = callback({ parent, args, ctx, info, role })

      return result
    }
  }

  return rule(options)(cb)
}
