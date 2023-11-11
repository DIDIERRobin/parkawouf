import { Global, Module } from "@nestjs/common";
import generalConfig, { validateGeneralConfig } from "./configs/general.config";
import mongodbConfig, { validateMongodbConfig } from "./configs/mongodb.config";
import * as joi from "joi";
import { MyConfigService } from "./my-config.service";
import { ConfigModule } from "@nestjs/config";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [generalConfig, mongodbConfig],
      validationSchema: joi.object({
        ...validateGeneralConfig,
        ...validateMongodbConfig,
      }),
    }),
  ],
  providers: [MyConfigService],
  exports: [MyConfigService],
})
export class MyConfigModule {}