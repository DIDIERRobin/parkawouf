import { HydratedDocument } from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { BaseEntitySchema } from "../../../shared/base-entity/base-entity.schema";
import { Picture } from "../../picture/objects/picture.schema";

export type OwnerDocument = HydratedDocument<Owner>;

@Schema()
export class Owner extends BaseEntitySchema {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({ type: Picture })
  picture: Picture;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
