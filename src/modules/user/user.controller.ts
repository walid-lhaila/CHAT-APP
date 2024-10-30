import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
    
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

<<<<<<< HEAD
  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.userService.update(id, updateUserDto);
=======
    @Post('/create')
    async create(@Body() createUserDto: CreateUserDto) {

        return this.userService.create(createUserDto);
>>>>>>> 164d51fecd66b6dd648eaa53e44ba147be4d77ee

      return {
        message: 'User Has Been Successfully Updated',
        existingUser,
      };
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred during update',
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
