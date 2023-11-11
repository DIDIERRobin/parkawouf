import { Module } from "@nestjs/common";
import { MyConfigModule } from "./modules/my-config/my-config.module";
import { MyConfigService } from "./modules/my-config/my-config.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MyConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async (myConfigService: MyConfigService) => ({
        uri: myConfigService.mongodb.uri,
      }),
      inject: [MyConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
