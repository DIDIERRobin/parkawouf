import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { iMongodbConfig, MONGODB_CONFIG_NAMESPACE } from "./configs/mongodb.config";
import { GENERAL_CONFIG_NAMESPACE, iGeneralConfig } from "./configs/general.config";

@Injectable()
export class MyConfigService {
  get mongodb(): iMongodbConfig {
    return this.conf.get(MONGODB_CONFIG_NAMESPACE)
  }

  get general(): iGeneralConfig {
    return this.conf.get(GENERAL_CONFIG_NAMESPACE)
  }

  constructor(private conf: ConfigService) {
  }

}
