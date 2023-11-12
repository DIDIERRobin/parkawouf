import { PickType } from "@nestjs/swagger";
import { Dog } from "../dog.schema";

export const smallDogOutputDtoKeys: Array<keyof Dog> = ["id", "name"];

export class SmallDogOutputDto extends PickType(Dog, smallDogOutputDtoKeys) {}
