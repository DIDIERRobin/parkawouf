import { Controller, Post } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";
import { UserService } from "../providers/user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly logger: LoggerService,
    private readonly userService: UserService,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  // TODO: delete
  @Post("robin")
  async create() {
    this.logger.verbose("create");
    this.userService.createRobin();
  }
}
