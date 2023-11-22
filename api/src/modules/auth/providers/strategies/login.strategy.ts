import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { LoggerService } from "../../../logger/logger.service";

export const LOGIN_STRATEGY_KEY = "login";

@Injectable()
export class LoginStrategy extends PassportStrategy(
  Strategy,
  LOGIN_STRATEGY_KEY,
) {
  constructor(
    private readonly logger: LoggerService,
    private authService: AuthService,
  ) {
    super({ usernameField: "email" });
    this.logger.setContext(this.constructor.name);
  }

  async validate(email: string, password: string): Promise<any> {
    this.logger.verbose("validate");
    this.logger.debug(
      `Validate user with email ${email} and password ${password}`,
    );
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
