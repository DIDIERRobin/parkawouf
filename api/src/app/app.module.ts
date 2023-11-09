import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from "@nestjs/serve-static";
import { DogModule } from "./modules/dog/dog.module";
import { MyConfigModule } from "./shared/modules/my-config/my-config.module";

@Module({
  imports: [
    MyConfigModule,
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
export class AppModule {}
