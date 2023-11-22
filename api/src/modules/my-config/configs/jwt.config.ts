import { registerAs } from "@nestjs/config";
import * as joi from "joi";

export const validateJwtConfig = {
  JWT_SECRET: joi.string().required(),
  JWT_TOKEN_DURATION: joi.string().required().default("10m"),
};

export interface iJwtConfig {
  secret: string;
  duration: string;
}

export const JWT_CONFIG_NAMESPACE = "jwt";

export default registerAs<iJwtConfig>(JWT_CONFIG_NAMESPACE, () => ({
  secret: process.env.JWT_SECRET,
  duration: process.env.JWT_TOKEN_DURATION,
}));
