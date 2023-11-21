import { Module } from "@nestjs/common";
import { MyConfigModule } from "./modules/my-config/my-config.module";
import { MyConfigService } from "./modules/my-config/my-config.service";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "./modules/logger/logger.module";
import { DogModule } from "./modules/dog/dog.module";
import { PictureModule } from "./modules/picture/picture.module";

@Module({
  imports: [
    // core modules
    MyConfigModule,
    LoggerModule,
    MongooseModule.forRootAsync({
      useFactory: async (myConfigService: MyConfigService) => ({
        uri: myConfigService.mongodb.uri,
      }),
      inject: [MyConfigService],
    }),

    // feature modules
    PictureModule,
    DogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
