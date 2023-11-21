import { PickType } from "@nestjs/swagger";
import { Dog } from "../dog.schema";

export const smallDogOutputDtoKeys: Array<keyof Dog> = [
  "_id",
  "name",
  "picture",
];

export class SmallDogOutputDto extends PickType(Dog, smallDogOutputDtoKeys) {}
