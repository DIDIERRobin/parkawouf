import { Prop } from "@nestjs/mongoose";

export class BaseEntitySchema {
  @Prop({
    required: true,
    unique: true,
  })
  id: string;

  @Prop({
    type: Date,
    required: true,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    required: true,
  })
  updatedAt: Date;
}
