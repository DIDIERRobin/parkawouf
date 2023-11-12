import { registerAs } from "@nestjs/config";
import * as joi from "joi";

export const validateLogConfig = {
  LOG_LEVEL_LOG: joi.string().valid("false", "true").default("true"),
  LOG_LEVEL_WARN: joi.string().valid("false", "true").default("true"),
  LOG_LEVEL_ERROR: joi.string().valid("false", "true").default("true"),
  LOG_LEVEL_VERBOSE: joi.string().valid("false", "true").default("false"),
  LOG_LEVEL_DEBUG: joi.string().valid("false", "true").default("false"),
};

export interface iLogConfig {
  log: boolean;
  warn: boolean;
  error: boolean;
  verbose: boolean;
  debug: boolean;
}

export const LOG_CONFIG_NAMESPACE = "log";

export default registerAs(LOG_CONFIG_NAMESPACE, () => ({
  log: process.env.LOG_LEVEL_LOG === "true" || true,
  warn: process.env.LOG_LEVEL_WARN === "true" || true,
  error: process.env.LOG_LEVEL_ERROR === "true" || true,
  verbose: process.env.LOG_LEVEL_VERBOSE === "true" || false,
  debug: process.env.LOG_LEVEL_DEBUG === "true" || false,
}));
