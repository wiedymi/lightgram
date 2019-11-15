/* eslint-disable no-useless-escape */
import fs from 'fs'

export const template = async (filePath, options) => {
  const file = `${process.cwd()}/src/mails/messages/${filePath}/template.html`
  const content = fs.readFileSync(file, 'utf8')

  let rendered = content.toString()

  String.prototype.replaceAll = function(name, value) {
    return this.replace(new RegExp(`\\\{${name}}`, 'gi'), value)
  }

  Object.entries(options).map(opt => {
    rendered = rendered.replaceAll(`${opt[0]}`, opt[1])
  })

  return rendered
}
