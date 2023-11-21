import { Injectable } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { S3Service } from "./s3.service";
import { PictureSourceEnum } from "./objects/picture-source.enum";
import * as sharp from "sharp";
import { PictureSizeEnum } from "./objects/picture-size.enum";
import { Picture } from "./objects/picture.schema";
import { v4 } from "uuid";

@Injectable()
export class PictureService {
  constructor(
    private readonly logger: LoggerService,
    private readonly s3: S3Service,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  private async _resizeAndConvert(
    originalBuffer: Buffer,
  ): Promise<Record<PictureSizeEnum, Buffer>> {
    this.logger.verbose("_resizeAndConvert");
    const small = await sharp(originalBuffer)
      .resize({ width: 100 }) // adjust size as needed
      .toFormat("webp")
      .toBuffer();

    const medium = await sharp(originalBuffer)
      .resize({ width: 500 }) // adjust size as needed
      .toFormat("webp")
      .toBuffer();

    const large = await sharp(originalBuffer)
      .resize({ width: 1000 }) // adjust size as needed
      .toFormat("webp")
      .toBuffer();

    const original = await sharp(originalBuffer).toFormat("webp").toBuffer();

    return { small, medium, large, original };
  }

  static getPictureUrl(
    uuid: string,
    size: PictureSizeEnum,
    source: PictureSourceEnum,
  ): string {
    return `${source}/${uuid}-${size}.webp`;
  }

  async uploadPicture(
    buffer: Buffer,
    source: PictureSourceEnum,
  ): Promise<Picture> {
    this.logger.verbose("uploadPicture");
    const buffers = await this._resizeAndConvert(buffer);
    const uuid = v4();

    await Promise.all([
      this.s3.uploadFile(
        PictureService.getPictureUrl(uuid, PictureSizeEnum.SMALL, source),
        buffers.small,
      ),
      this.s3.uploadFile(
        PictureService.getPictureUrl(uuid, PictureSizeEnum.MEDIUM, source),
        buffers.medium,
      ),
      this.s3.uploadFile(
        PictureService.getPictureUrl(uuid, PictureSizeEnum.LARGE, source),
        buffers.large,
      ),
      this.s3.uploadFile(
        PictureService.getPictureUrl(uuid, PictureSizeEnum.ORIGINAL, source),
        buffers.original,
      ),
    ]);

    const pic = new Picture();
    pic.uuid = uuid;
    pic.source = source;
    return pic;
  }

  async deletePicture(picture: Picture): Promise<void> {
    this.logger.verbose("deletePicture");
    await Promise.all([
      this.s3.deleteFile(
        PictureService.getPictureUrl(
          picture.uuid,
          PictureSizeEnum.SMALL,
          picture.source,
        ),
      ),
      this.s3.deleteFile(
        PictureService.getPictureUrl(
          picture.uuid,
          PictureSizeEnum.MEDIUM,
          picture.source,
        ),
      ),
      this.s3.deleteFile(
        PictureService.getPictureUrl(
          picture.uuid,
          PictureSizeEnum.LARGE,
          picture.source,
        ),
      ),
      this.s3.deleteFile(
        PictureService.getPictureUrl(
          picture.uuid,
          PictureSizeEnum.ORIGINAL,
          picture.source,
        ),
      ),
    ]);
  }
}
