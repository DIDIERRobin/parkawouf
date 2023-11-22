import { Global, Module } from "@nestjs/common";
import generalConfig, { validateGeneralConfig } from "./configs/general.config";
import mongodbConfig, { validateMongodbConfig } from "./configs/mongodb.config";
import * as joi from "joi";
import { MyConfigService } from "./my-config.service";
import { ConfigModule } from "@nestjs/config";
import logConfig, { validateLogConfig } from "./configs/log.config";
import s3Config, { validateS3Config } from "./configs/s3.config";
import jwtConfig, { validateJwtConfig } from "./configs/jwt.config";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [generalConfig, mongodbConfig, logConfig, s3Config, jwtConfig],
      validationSchema: joi.object({
        ...validateGeneralConfig,
        ...validateMongodbConfig,
        ...validateLogConfig,
        ...validateS3Config,
        ...validateJwtConfig,
      }),
    }),
  ],
  providers: [MyConfigService],
  exports: [MyConfigService],
})
export class MyConfigModule {}
