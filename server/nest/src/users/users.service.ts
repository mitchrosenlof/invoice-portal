import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async findOne(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email,
      }
    });
  }

  async removeAll() {
    return this.databaseService.user.deleteMany({});
  }
}
