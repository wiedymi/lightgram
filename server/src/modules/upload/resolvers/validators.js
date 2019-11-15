import { createValidator, validate } from '@/lib'

export const uploadValidator = createValidator([
  validate('file')
    .not()
    .isEmpty({ msg: 'File is required' }),
])

export const uploadManyValidator = createValidator([
  validate('files')
    .not()
    .isEmpty({ msg: 'Files are required' }),
])
