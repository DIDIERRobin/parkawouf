import { Prop, Schema } from "@nestjs/mongoose";
import { PictureSourceEnum } from "./picture-source.enum";

@Schema({
  _id: false,
  versionKey: false,
})
export class Picture {
  @Prop({
    required: false,
  })
  uuid: string;

  @Prop({
    required: true,
    enum: PictureSourceEnum,
  })
  source: PictureSourceEnum;
}
