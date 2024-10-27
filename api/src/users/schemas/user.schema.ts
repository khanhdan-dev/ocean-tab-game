import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
class Resources {
  @Prop()
  coins: number;
  @Prop()
  fish: number;

  @Prop()
  shells: number;
}

@Schema({ collection: 'UserList' })
export class User {
  @Prop({ required: true })
  id: number;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  username: string;

  @Prop()
  photo_url: string;

  @Prop()
  auth_date: string;

  @Prop()
  hash: string;

  @Prop()
  turns: number;

  @Prop()
  resources: Resources;
}

export const UserSchema = SchemaFactory.createForClass(User);
