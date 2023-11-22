import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";
import { LocalAuthGuard } from "../providers/guards/local-auth.guard";
import { PublicRoute } from "../decorators/public-route.decorator";
import { AuthService } from "../providers/auth.service";
import { JwtPayload } from "../decorators/jwt-payload.decorator";
import { JwtPayloadDto } from "../object/jwt-payload.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: AuthService,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@JwtPayload() jwtPayloadDto: JwtPayloadDto) {
    this.logger.verbose("login");
    return this.service.signPayload(jwtPayloadDto);
  }
}
