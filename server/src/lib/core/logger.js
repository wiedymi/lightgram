import winston from 'winston'
import { LOGGERS } from '@/constants'

const { FILES, COLORS, INFO, ERROR, DEBUG, LEVELS } = LOGGERS

const {
  format,
  createLogger,
  transports: { Console, File },
} = winston

const exportFileFormat = format.combine(
  format.printf(info => `${info.level}: ${info.message.trim()}`),
)

const consoleLogViewFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => {
    const date = new Date(info.timestamp)

    const day = date.toLocaleDateString('en-US')
    const time = date.toLocaleTimeString('en-US')

    return `${day} ${time} [${info.level}]: ${info.message.trim()}`
  }),
)

const createLoggers = type => {
  return new createLogger({
    levels: LEVELS,
    transports: [
      new Console({
        level: type,
        handleExceptions: true,
        format: consoleLogViewFormat,
        colorize: true,
      }),
      new File({
        filename: `./logs/${FILES[type]}.log`,
        level: type,
        format: exportFileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
      }),
    ],
    exitOnError: false,
  })
}

winston.addColors(COLORS)

const infologger = createLoggers(INFO)
const debuglogger = createLoggers(ERROR)
const errorlogger = createLoggers(DEBUG)

const Logger = {
  info: message => {
    return infologger.info(message)
  },
  debug: message => {
    return debuglogger.debug(message)
  },
  error: message => {
    return errorlogger.error(message)
  },
  stream: {
    write(message) {
      infologger.info(message)
    },
  },
  combined:
    ':remote-addr :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
}

export { Logger }
