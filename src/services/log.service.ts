import { LoggerAdapter } from './interfaces/log.adapter';
import winston, { createLogger, Logger, format, transports } from 'winston';

export class LoggerService implements LoggerAdapter {
  private loggerConfig: Logger;
  private static instance: LoggerService;

  static getInstance = (): LoggerService => {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }

    return LoggerService.instance;
  };

  private constructor() {
    this.loggerConfig = this.configLogger();
  }

  info = (message: string): void => {
    this.loggerConfig.info(message);
  };

  debug = (message: string): void => {
    this.loggerConfig.debug(message);
  };

  warn = (message: string): void => {
    this.loggerConfig.warn(message);
  };

  error = (message: string): void => {
    this.loggerConfig.error(message);
  };

  private configLogger = () => {
    return createLogger({
      format: this.formatConfig(),
      transports: this.configTransports(),
    });
  };

  private formatConfig = (): winston.Logform.Format => {
    return format.combine(
      format.simple(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(
        (info) =>
          `${info.timestamp} _${info.level.toUpperCase()}_: ${info.message}`
      )
    );
  };

  private configTransports = () => {
    return [
      new transports.File({
        maxsize: 5120000,
        maxFiles: 5,
        filename: `${__dirname}/../../logs/log-server.log`,
      }),
      new transports.Console({
        level: 'debug',
      }),
    ];
  };
}
