import { Module } from "@nestjs/common";
import { DogService } from "./dog.service";
import { DogController } from "./dog.controller";
import { Dog, DogSchema } from "./objects/dog.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Owner, OwnerSchema } from "./objects/owner.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dog.name, schema: DogSchema },
      { name: Owner.name, schema: OwnerSchema },
    ]),
  ],
  controllers: [DogController],
  providers: [DogService],
  exports: [DogService],
})
export class DogModule {}
