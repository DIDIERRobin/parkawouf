import { Module } from "@nestjs/common";
import { S3Service } from "./s3.service";
import { PictureService } from "./picture.service";

@Module({
  imports: [],
  providers: [S3Service, PictureService],
  exports: [PictureService],
})
export class PictureModule {}
