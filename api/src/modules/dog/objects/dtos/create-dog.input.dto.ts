import { PickType } from "@nestjs/swagger";
import { Dog } from "../dog.schema";

export class CreateDogInputDto extends PickType(Dog, ["name"]) {}
