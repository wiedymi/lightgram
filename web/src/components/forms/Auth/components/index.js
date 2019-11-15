import { createUser, handleLogin } from '@/graphql'
import { createAuthFrom } from './helper'

const Registration = createAuthFrom(
  'registration',
  'createUser',
  createUser,
  'Sign in',
  'Log in now!',
  false,
  true,
)
const Login = createAuthFrom('login', 'login', handleLogin, 'Log in', 'Sign in now!', true, false)

export { Registration, Login }
