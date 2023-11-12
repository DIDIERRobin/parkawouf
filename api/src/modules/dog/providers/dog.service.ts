import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";
import { InjectModel } from "@nestjs/mongoose";
import { Dog, DogDocument } from "../objects/dog.schema";
import { Model } from "mongoose";
import { CreateDogInputDto } from "../objects/dtos/create-dog.input.dto";
import {
  SmallDogOutputDto,
  smallDogOutputDtoKeys,
} from "../objects/dtos/small-dog.output.dto";
import { Picture } from "../../picture/objects/picture.schema";
import { PictureService } from "../../picture/picture.service";
import { PictureSourceEnum } from "../../picture/objects/picture-source.enum";

@Injectable()
export class DogService {
  constructor(
    private readonly logger: LoggerService,
    @InjectModel(Dog.name) private dogModel: Model<Dog>,
    private readonly pictureService: PictureService,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  /* region READING */
  async findAll(): Promise<SmallDogOutputDto[]> {
    this.logger.verbose("findAll");
    return this.dogModel.find().lean().select(smallDogOutputDtoKeys).exec();
  }

  async findOneById(uuid: string): Promise<DogDocument | null> {
    this.logger.verbose("findOneById");
    return this.dogModel.findById(uuid).exec();
  }
  /* endregion */

  /* region WRITING */
  async create(dto: CreateDogInputDto): Promise<Dog> {
    this.logger.verbose("create");
    const dog = new this.dogModel(dto);
    return dog.save();
  }

  async updateProfilePicture(
    dog: DogDocument,
    pictureBuffer: Buffer,
  ): Promise<Picture> {
    this.logger.verbose("updateProfilePicture");
    if (dog.picture) {
      await this.pictureService.deletePicture(dog.picture);
    }
    const newPicture = await this.pictureService.uploadPicture(
      pictureBuffer,
      PictureSourceEnum.dog,
    );
    dog.picture = newPicture;
    await dog.save();
    return newPicture;
  }
  /* endregion */
}
