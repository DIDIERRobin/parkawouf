import mongoose, { HydratedDocument } from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Owner } from "./owner.schema";
import { BaseEntitySchema } from "../../../shared/base-entity/base-entity.schema";
import { IsString } from "class-validator";

export type DogDocument = HydratedDocument<Dog>;

@Schema()
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
}

export const DogSchema = SchemaFactory.createForClass(Dog);
