import { Module } from '@nestjs/common';
import { DogsGateway } from "./dog.gateway";
import { DogController } from "./dog.controller";

@Module({
  imports: [
  ],
  controllers: [DogController],
  providers: [DogsGateway],
})
export class DogModule {}
