import { Module } from "@nestjs/common";
import { DogService } from "./providers/dog.service";
import { DogController } from "./dog.controller";
import { Dog, DogSchema } from "./objects/dog.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Owner, OwnerSchema } from "./objects/owner.schema";
import { PictureModule } from "../picture/picture.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dog.name, schema: DogSchema },
      { name: Owner.name, schema: OwnerSchema },
    ]),
    PictureModule,
  ],
  controllers: [DogController],
  providers: [DogService],
  exports: [DogService],
})
export class DogModule {}
