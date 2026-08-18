import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createUserDto: Prisma.UserCreateInput) {
    const userExist = await this.prisma.user.findUnique({
      where: { email: createUserDto.email }
    })
    if (!userExist) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10)

      const user = await this.prisma.user.create({
        data: createUserDto
      });
      return user;

    } else {
      throw new BadRequestException("User already exist in database")
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({
      where: {},
    })
  }

  async userExist(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
