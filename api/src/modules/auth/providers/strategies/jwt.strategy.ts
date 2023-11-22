import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../../logger/logger.service";
import { MyConfigService } from "../../../my-config/my-config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly logger: LoggerService,
    private readonly config: MyConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
    this.logger.setContext(this.constructor.name);
  }

  async validate(payload: any) {
    this.logger.verbose("validate");
    return { userId: payload.sub, email: payload.email };
  }
}
