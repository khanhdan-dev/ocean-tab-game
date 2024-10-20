import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'UserList' })
export class User {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  photo_url: string;

  @Prop({ required: true })
  auth_date: string;

  @Prop({ required: false })
  hash: string;

  @Prop({ required: false })
  turns: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
