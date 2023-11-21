import { registerAs } from "@nestjs/config";
import * as joi from "joi";

export const validateS3Config = {
  CELLAR_ADDON_HOST: joi.string().required(),
  CELLAR_ADDON_KEY_ID: joi.string().required(),
  CELLAR_ADDON_KEY_SECRET: joi.string().required(),
  CELLAR_ADDON_BUCKET: joi.string().required(),
};

export interface iS3Config {
  host: string;
  keyId: string;
  keySecret: string;
  bucket: string;
}

export const S3_CONFIG_NAMESPACE = "s3";

export default registerAs<iS3Config>(S3_CONFIG_NAMESPACE, () => ({
  host: process.env.CELLAR_ADDON_HOST,
  keyId: process.env.CELLAR_ADDON_KEY_ID,
  keySecret: process.env.CELLAR_ADDON_KEY_SECRET,
  bucket: process.env.CELLAR_ADDON_BUCKET,
}));
