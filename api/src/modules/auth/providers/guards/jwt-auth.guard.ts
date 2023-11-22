import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoggerService } from "../../../logger/logger.service";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../../decorators/public-route.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private readonly logger: LoggerService,
    private reflector: Reflector,
  ) {
    super();
    this.logger.setContext(this.constructor.name);
  }

  canActivate(context: ExecutionContext) {
    this.logger.verbose("canActivate");
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      this.logger.debug("Public route, not check on token");
      return true;
    }
    this.logger.debug("decoding token (passport)");
    return super.canActivate(context);
  }
}
