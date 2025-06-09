import pino from 'pino';
import dayjs from 'dayjs';

const isDev = process.env.NODE_ENV !== 'production';

const log = pino(
  isDev
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
        base: {
          pid: false,
        },
        timestamp: () => `, "time":"${dayjs().format()}"`,
      }
    : {
        base: {
          pid: false,
        },
        timestamp: () => `, "time":"${dayjs().format()}"`,
      }
);

export default log;