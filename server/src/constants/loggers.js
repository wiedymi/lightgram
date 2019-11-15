const INFO = 'info'
const DEBUG = 'debug'
const ERROR = 'error'

const LEVELS = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

const FILES = {
  [INFO]: 'info',
  [DEBUG]: 'debug',
  [ERROR]: 'error',
}

const COLORS = {
  [INFO]: 'blue',
  [DEBUG]: 'yellow',
  [ERROR]: 'red',
}

export default {
  FILES,
  COLORS,
  INFO,
  DEBUG,
  ERROR,
  LEVELS,
}
