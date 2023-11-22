import { IsString } from "class-validator";

export class LoginOutputDto {
  @IsString()
  access_token: string;
}
