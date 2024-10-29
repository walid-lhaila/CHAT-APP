import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';


@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}


    @Post()
    async create(@Body() createUserDto: CreateUserDto) {

    }


    @Get()
    async findAll() {

    }


    @Get(':id')
    async findOne(@Param('id') id: string){

    }
    

    @Patch('id')
    async update(@Param('id') id: string, @Body() UpdateUserDto: Partial<CreateUserDto>) {

    }
    
}
