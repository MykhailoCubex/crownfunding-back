import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CampaignEntity,
  StatusEnum,
} from '../campaigns/entities/campaigns.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepo: Repository<UserEntity>,
    @InjectRepository(CampaignEntity)
    private campRepo: Repository<CampaignEntity>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { campaignId, amount } = dto;
    if (dto.campaignId) {
      const camp = await this.campRepo.findOne({ where: { id: campaignId } });
      const { goal, balance } = camp;
      camp.balance = balance + amount;
      if (goal <= balance + amount) {
        camp.status = StatusEnum.Successful;
      }
      await this.campRepo.save(camp);

      // @ts-ignore
      dto.campaign = camp;
    }
    return await this.usersRepo.save(dto);
  }
}
