import { Global, Module, Scope } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { MyConfigService } from "../my-config/my-config.service";

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: LoggerService,
      inject: [MyConfigService],
      useFactory: (config: MyConfigService): LoggerService => {
        return new LoggerService(config);
      },
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
