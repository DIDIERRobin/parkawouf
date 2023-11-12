import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { DogService } from "./providers/dog.service";
import { SmallDogOutputDto } from "./objects/dtos/small-dog.output.dto";
import { CreateDogInputDto } from "./objects/dtos/create-dog.input.dto";
import { Dog, DogDocument } from "./objects/dog.schema";
import { Picture } from "../picture/objects/picture.schema";
import { CurrentDog } from "./objects/decorators/current-dog.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { DogIdInterceptor } from "./providers/dog-id.interceptor";

export const DOG_ID_PARAM = "dogId";

@Controller("dogs")
export class DogController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: DogService,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  @Get()
  listAllDogs(): Promise<SmallDogOutputDto[]> {
    this.logger.verbose("listAllDogs");
    return this.service.findAll();
  }

  @Post()
  createADog(@Body() body: CreateDogInputDto): Promise<Dog> {
    this.logger.verbose("createADog");
    return this.service.create(body);
  }

  @Put(`:${DOG_ID_PARAM}/picture`)
  @UseInterceptors(DogIdInterceptor)
  @UseInterceptors(FileInterceptor("file"))
  updateDogPicture(
    @CurrentDog() dog: DogDocument,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Picture> {
    this.logger.verbose("updateDogPicture");
    if (!file) {
      throw new BadRequestException("No file provided");
    }
    return this.service.updateProfilePicture(dog, file.buffer);
  }
}
