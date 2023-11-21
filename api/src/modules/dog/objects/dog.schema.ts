import mongoose, { HydratedDocument } from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Owner } from "./owner.schema";
import { IsString } from "class-validator";
import { Picture } from "../../picture/objects/picture.schema";
import {
  BaseEntitySchema,
  baseEntitySchemaOptions,
} from "../../../shared/base-entity/base-entity.schema";

export type DogDocument = HydratedDocument<Dog>;

@Schema(baseEntitySchemaOptions)
export class Dog extends BaseEntitySchema {
  @Prop({
    required: true,
  })
  @IsString()
  name: string;

  @Prop({
    type: Date,
    required: false,
  })
  birthDate: Date;

  @Prop({
    required: false,
  })
  breed: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Owner" }] })
  owner: Owner[];

  @Prop({ type: Picture })
  picture: Picture;
}

export const DogSchema = SchemaFactory.createForClass(Dog);
