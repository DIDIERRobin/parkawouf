import { Prop } from "@nestjs/mongoose";
import { v4 } from "uuid";

export const baseEntitySchemaOptions = {
  timestamps: true,
  _id: false,
  versionKey: false,
};
export class BaseEntitySchema {
  @Prop({
    required: true,
    default: v4,
  })
  _id: string;

  createdAt: Date;
  updatedAt: Date;
}
