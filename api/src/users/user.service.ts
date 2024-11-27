import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  private isAppInitialized = false;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // This method runs when the app is fully initialized
  onApplicationBootstrap() {
    this.isAppInitialized = true;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
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
    timeZone: 'UTC',
  })
  async handleCronAddTurnsEveryDay() {
    // Only run the cron job when the app is fully initialized
    if (!this.isAppInitialized) {
      console.log('App not initialized yet. Cron job not running.');
      return;
    }

    try {
      const userList: User[] = await this.userModel.find().exec();
      const bulkOps = userList.map((u) => ({
        updateOne: {
          filter: { id: u.id },
          update: { $set: { turns: (u.turns || 0) + 20 } },
        },
      }));

      if (bulkOps.length > 0) {
        await this.userModel.bulkWrite(bulkOps);
      }

      console.log('Cron job executed successfully');
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }

  async remove(id: number) {
    const result = await this.userModel.deleteOne({ id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return `User with ID ${id} removed successfully`;
  }
}
