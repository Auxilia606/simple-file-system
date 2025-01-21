import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Directory extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, default: null })
  parentId: string | null;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ required: true })
  createdBy: string;
}

export const DirectorySchema = SchemaFactory.createForClass(Directory);
