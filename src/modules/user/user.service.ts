import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    
    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
      
        const { password, ...userData } = createUserDto;  
        const hashedPassword = await bcrypt.hash(password, 10);
            
        const createUser = new this.userModel({
          ...userData,
          password: hashedPassword,
        });

        return createUser.save(); 

    }
    
      async findAll() {

    }
    
      async findOne(id: string){

    }
    
      async update(id: string, updateUserDto: Partial<CreateUserDto>) {

    }
    

}