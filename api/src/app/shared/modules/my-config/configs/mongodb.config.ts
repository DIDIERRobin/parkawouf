import { registerAs } from "@nestjs/config";
import * as joi from "joi";

export const validateMongodbConfig = {
  MONGODB_ADDON_DB: joi.string().required(),
  MONGODB_ADDON_HOST: joi.string().required(),
  MONGODB_ADDON_USER: joi.string().required(),
  MONGODB_ADDON_PASSWORD: joi.string().required(),
  MONGODB_ADDON_PORT: joi.number().required(),
}

export interface iMongodbConfig {
  db: string
  host: string
  password: string
  port: number
  user: string
  uri: string
}
export const MONGODB_CONFIG_NAMESPACE = 'mongodb'

export default registerAs<iMongodbConfig>(MONGODB_CONFIG_NAMESPACE, () => {
  const result = {
    db: process.env.MONGODB_ADDON_DB,
    host: process.env.MONGODB_ADDON_HOST,
    password: process.env.MONGODB_ADDON_PASSWORD,
    port: parseInt(process.env.MONGODB_ADDON_PORT, 10),
    user: process.env.MONGODB_ADDON_USER,
  }
  return {
    ...result,
    uri: `mongodb://${result.user}:${result.password}@${result.host}:${result.port}/${result.db}`,
  }
})
