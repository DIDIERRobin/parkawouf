import { Module } from "@nestjs/common";
import { UserService } from "./providers/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./objects/user.schema";
import { UserController } from "./controllers/user.controller";

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
