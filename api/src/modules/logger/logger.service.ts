import { ConsoleLogger, Injectable } from "@nestjs/common";
import { LoggerService as LS } from "@nestjs/common/services/logger.service";
import { MyConfigService } from "../my-config/my-config.service";

@Injectable()
export class LoggerService extends ConsoleLogger implements LS {
  constructor(private readonly configService: MyConfigService) {
    super();
  }

  private _formatMessage(message: unknown): string {
    if (typeof message === "string") {
      return message;
    } else if (message instanceof Error) {
      return message.stack || message.message;
    } else {
      return JSON.stringify(message, null, 2); // Indentation for readability
    }
  }

  private _commonLogFunction(
    message: string | object | Error,
    logFunctionKey: "log" | "warn" | "debug" | "error" | "verbose",
  ): void {
    super[logFunctionKey](this._formatMessage(message));
  }

  log(message: string | object): void {
    if (this.configService.log.log) {
      this._commonLogFunction(message, "log");
    }
  }

  warn(message: string | object): void {
    if (this.configService.log.warn) {
      this._commonLogFunction(message, "warn");
    }
  }

  debug(message: string | object): void {
    if (this.configService.log.debug) {
      this._commonLogFunction(message, "debug");
    }
  }

  error(message: string | object | Error): void {
    if (this.configService.log.error) {
      this._commonLogFunction(message, "error");
    }
  }

  verbose(message: string | object): void {
    if (this.configService.log.verbose) {
      this._commonLogFunction(message, "verbose");
    }
  }
}
