import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  // private userList: any[] = []; // Variable to store user list
  constructor(private readonly userService: UserService) {}

  // Method to update the cached userList
  // private async updateUserList() {
  //   this.userList = await this.userService.findAll();
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('cron')
  async handleCron() {
    try {
      await this.userService.handleCronAddTurnsEveryDay();
      return { message: 'Cron task executed successfully' };
    } catch (error) {
      return { message: 'Error executing cron task', error: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
