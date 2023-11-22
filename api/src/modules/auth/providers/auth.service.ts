import { Injectable } from "@nestjs/common";
import { UserService } from "../../user/providers/user.service";
import { LoggerService } from "../../logger/logger.service";
import { User } from "../../user/objects/user.schema";
import { JwtPayloadDto } from "../object/jwt-payload.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginOutputDto } from "../object/login-output.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<JwtPayloadDto | null> {
    const user = await this.usersService.findOneWithEmail(email);
    if (user && user.password === pass) {
      return { email: user.email, sub: user._id };
    }
    return null;
  }

  signPayload(jwtPayload: JwtPayloadDto): LoginOutputDto {
    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }
}
