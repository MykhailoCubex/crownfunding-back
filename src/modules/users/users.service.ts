import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private locationsRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto) {
    return await this.locationsRepository.save(dto);
  }
}
