import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { nextTick } from 'node:process';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let password: string = null;
    if ('password' in updateUserDto) {
      password = updateUserDto.password;
      updateUserDto.password = await this.getHash(password);
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }, '+password');
  }

  async findByQuery(query: any) {
    let result = null;
    console.log({ query });
    try {
      result = await this.userModel.find(query);
    } catch (error) {
      result = [];
    }
    return result;
  }

  async checkEmail(email: string) {
    const result = this.userModel.findOne({ email }, '+password');
    return await result;
  }

  getHash(password): Promise<any> {
    return new Promise((resolve) => {
      bcrypt.hash(password, 10, function (err, hash) {
        resolve(hash);
      });
    });
  }
}
