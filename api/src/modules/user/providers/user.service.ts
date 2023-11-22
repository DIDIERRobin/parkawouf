import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../objects/user.schema";

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  async findOneWithEmail(email: string): Promise<User | undefined> {
    this.logger.verbose("findOne");
    this.logger.debug(`Find one with username ${email}`);
    return this.userModel.findOne({ email }).lean().exec();
  }

  async createRobin(): Promise<UserDocument> {
    this.logger.verbose("Create Robin");
    return this.userModel.create({
      email: "mathiisss@gmail.com",
      password: "qwerty",
      firstname: "Robin",
      lastname: "DIDIER",
    });
  }
}
