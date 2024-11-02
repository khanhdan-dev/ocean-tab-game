import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createCatDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return this.userModel.findOne({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserDto);

    return user.save();
  }

  @Cron('0 0 * * *', {
    timeZone: 'UTC', // Set time zone to UTC
  })
  async handleCronAddTurnsEveryDay() {
    const userList: User[] = await this.userModel.find().exec();

    const bulkOps = userList.map((u) => ({
      updateOne: {
        filter: { id: u.id }, // Use the MongoDB ObjectId
        update: { $set: { turns: u.turns + 20 } },
      },
    }));

    if (bulkOps.length > 0) {
      await this.userModel.bulkWrite(bulkOps);
    }
  }

  async remove(id: number) {
    // Change number to string for ObjectId
    const result = await this.userModel.deleteOne({ id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return `User with ID ${id} removed successfully`;
  }
}
