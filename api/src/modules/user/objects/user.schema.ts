import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import {
  BaseEntitySchema,
  baseEntitySchemaOptions,
} from "../../../shared/base-entity/base-entity.schema";

export type UserDocument = HydratedDocument<User>;

@Schema(baseEntitySchemaOptions)
export class User extends BaseEntitySchema {
  @Prop({
    required: true,
  })
  @IsString()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  password: string;

  @Prop({
    required: true,
  })
  @IsString()
  firstname: string;

  @Prop()
  @IsString()
  lastname?: string;

  @Prop()
  birthDate?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
