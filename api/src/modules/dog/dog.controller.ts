import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { DogService } from "./dog.service";
import { SmallDogOutputDto } from "./objects/dtos/small-dog.output.dto";
import { CreateDogInputDto } from "./objects/dtos/create-dog.input.dto";
import { Dog } from "./objects/dog.schema";

@Controller("dog")
export class DogController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: DogService,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  @Get()
  listAllDogs(): Promise<SmallDogOutputDto[]> {
    return this.service.findAll();
  }

  @Post()
  createADog(@Body() body: CreateDogInputDto): Promise<Dog> {
    return this.service.create(body);
  }
}
