import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from "@nestjs/serve-static";
import { DogModule } from "./dog/dog.module";

@Module({
  imports: [
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
