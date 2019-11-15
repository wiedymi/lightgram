import fs from 'fs'
import uuid from 'uuid'
import jimp from 'jimp'
import { config } from '@/lib'

const whiteList = ['png', 'jpg', 'jpeg']

const createPath = (prefix, fileName, extra, extension, root = false) => {
  return `${root ? config.SERVER : process.cwd()}/uploads/${prefix}${fileName}.${
    extra ? extra + '.' : ''
  }${extension}`
}

const fileHandler = async (raw, opts, callback) => {
  const file = await raw.then(data => data)
  const stream = file.createReadStream()
  const extension = file.mimetype.split('/')[1]

  if (!whiteList.includes(extension)) {
    throw new Error('No allowed extension')
  }

  const id = uuid()
  const prefix = opts.prefix || ''
  const path = createPath(prefix, id, null, extension)
  const url = createPath(prefix, id, null, extension, true)
  if (!fs.existsSync(path)) {
    fs.mkdirSync(`${process.cwd()}/uploads/${prefix}`, { recursive: true })
  }

  await stream.pipe(fs.createWriteStream(path))

  const result = new Promise(resolve => {
    stream.on('end', async () => {
      const buffer = fs.readFileSync(path)
      const image = await jimp.read(buffer)

      if (!callback) {
        return {
          id,
          path,
          url,
          prefix,
          extension,
        }
      }

      resolve(
        callback(
          {
            id,
            path,
            prefix,
            url,
            extension,
          },
          image,
          createPath,
        ),
      )
    })
  })

  await result

  return result
}

export const singleUpload = async (file, opts = { whiteList }, callback) => {
  return fileHandler(file, opts, callback)
}

export const multiUpload = async (files, opts = { whiteList }, callback) => {
  return files.map(async raw => {
    const result = await fileHandler(raw, opts, callback)

    return result
  })
}
