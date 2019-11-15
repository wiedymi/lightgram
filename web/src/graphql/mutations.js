import { createMutation } from '@/helpers'
import { MUTATIONS } from '@/constants'

export const createUser = createMutation(MUTATIONS.CREATE_USER)
export const handleLogin = createMutation(MUTATIONS.LOGIN)
export const createPost = createMutation(MUTATIONS.CREATE_POST)
