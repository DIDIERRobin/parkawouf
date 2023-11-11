import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from "@nestjs/serve-static";
import { DogModule } from "./modules/dog/dog.module";
import { MyConfigModule } from "./shared/modules/my-config/my-config.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MyConfigService } from "./shared/modules/my-config/my-config.service";

@Module({
  imports: [
    MyConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async (myConfigService: MyConfigService) => ({
        uri: myConfigService.mongodb.uri
      }),
      inject: [MyConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front'),
      // Exclure le chemin de l'API pour éviter tout conflit
      exclude: ['/api*'],
    }),
    DogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
