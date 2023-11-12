import { Injectable } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { InjectModel } from "@nestjs/mongoose";
import { Dog } from "./objects/dog.schema";
import { Model } from "mongoose";
import { CreateDogInputDto } from "./objects/dtos/create-dog.input.dto";
import {
  SmallDogOutputDto,
  smallDogOutputDtoKeys,
} from "./objects/dtos/small-dog.output.dto";

@Injectable()
export class DogService {
  constructor(
    private logger: LoggerService,
    @InjectModel(Dog.name) private dogModel: Model<Dog>,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  async create(dto: CreateDogInputDto): Promise<Dog> {
    const createdDog = new this.dogModel(dto);
    return createdDog.save();
  }

  async findAll(): Promise<SmallDogOutputDto[]> {
    return this.dogModel.find().select(smallDogOutputDtoKeys).exec();
  }
}
