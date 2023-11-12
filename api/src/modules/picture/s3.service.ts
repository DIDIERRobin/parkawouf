import { Injectable } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { MyConfigService } from "../my-config/my-config.service";
import {
  AbortMultipartUploadCommandOutput,
  CompleteMultipartUploadCommandOutput,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private logger: LoggerService, private config: MyConfigService) {
    this.logger.setContext(this.constructor.name);
    const s3Config = this.config.s3;
    this.bucketName = s3Config.bucket;
    this.s3Client = new S3Client({
      region: "eu-west-1",
      credentials: {
        accessKeyId: s3Config.keyId,
        secretAccessKey: s3Config.keySecret,
      },
      endpoint: `https://${s3Config.host}`,
      forcePathStyle: true,
    });
  }

  async uploadFile(
    name: string,
    buffer: Buffer,
  ): Promise<
    CompleteMultipartUploadCommandOutput | AbortMultipartUploadCommandOutput
  > {
    this.logger.verbose("uploadFile");
    this.logger.debug(`name: ${name}`);
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: name,
        Body: buffer,
        ACL: "public-read",
      },
    });

    try {
      await upload.done();
    } catch (e) {
      console.log(e);
    }

    return upload.done();
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }
}
