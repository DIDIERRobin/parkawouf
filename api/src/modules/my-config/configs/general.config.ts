import { registerAs } from "@nestjs/config";
import * as joi from 'joi'

export const validateGeneralConfig = {
  NODE_ENV: joi.string().valid('local', 'production').default('local'),
  PORT: joi.number().default(3000),
}

export interface iGeneralConfig {
  env: string;
  port: number;
}

export const GENERAL_CONFIG_NAMESPACE = 'general'

export default registerAs<iGeneralConfig>(GENERAL_CONFIG_NAMESPACE, () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
}))
