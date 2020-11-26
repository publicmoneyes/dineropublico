import { LoggerAdapter } from './adapters/log.adapter';
import winston, { createLogger, Logger, format, transports } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

export class LoggerService implements LoggerAdapter {
  private loggerConfig: Logger;
  private static instance: LoggerService;
  private environment: string;
  //private loggingWinston = new LoggingWinston();

  static getInstance = (): LoggerService => {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }

    return LoggerService.instance;
  };

  private constructor() {
    this.loggerConfig = this.configLogger();
    this.environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
  }

  info(message: string): void {
    this.loggerConfig.info(`${this.environment} --> ${message}`);
  }

  debug(message: string): void {
    this.loggerConfig.debug(`${this.environment} --> ${message}`);
  }

  warn(message: string): void {
    this.loggerConfig.warn(`${this.environment} --> ${message}`);
  }

  error(message: string): void {
    this.loggerConfig.error(`${this.environment} --> ${message}`);
  }

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
      format.printf((info) => `${info.timestamp} _${info.level.toUpperCase()}_: ${info.message}`)
    );
  };

  private configTransports = () => {
    return [new transports.Console()];
    // return [new transports.Console(), this.loggingWinston];
  };
}
