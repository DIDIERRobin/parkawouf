import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  iMongodbConfig,
  MONGODB_CONFIG_NAMESPACE,
} from "./configs/mongodb.config";
import {
  GENERAL_CONFIG_NAMESPACE,
  iGeneralConfig,
} from "./configs/general.config";
import { iLogConfig, LOG_CONFIG_NAMESPACE } from "./configs/log.config";
import { iS3Config, S3_CONFIG_NAMESPACE } from "./configs/s3.config";
import { iJwtConfig, JWT_CONFIG_NAMESPACE } from "./configs/jwt.config";

@Injectable()
export class MyConfigService {
  get mongodb(): iMongodbConfig {
    return this.conf.get(MONGODB_CONFIG_NAMESPACE);
  }

  get general(): iGeneralConfig {
    return this.conf.get(GENERAL_CONFIG_NAMESPACE);
  }

  get log(): iLogConfig {
    return this.conf.get(LOG_CONFIG_NAMESPACE);
  }

  get s3(): iS3Config {
    return this.conf.get(S3_CONFIG_NAMESPACE);
  }

  get jwt(): iJwtConfig {
    return this.conf.get(JWT_CONFIG_NAMESPACE);
  }

  constructor(private conf: ConfigService) {}
}
