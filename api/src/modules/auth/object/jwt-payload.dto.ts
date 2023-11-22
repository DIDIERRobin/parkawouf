import { PickType } from "@nestjs/swagger";
import { User } from "../../user/objects/user.schema";
import { IsString } from "class-validator";

export const jwtPayloadDtoKeys = ["email"] satisfies (keyof User)[];

export class JwtPayloadDto extends PickType(User, jwtPayloadDtoKeys) {
  @IsString()
  sub: string;
}
