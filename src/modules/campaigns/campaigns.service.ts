import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dto/create-campaigns.dto';
import { CampaignEntity } from './entities/campaigns.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(CampaignEntity)
    private campsRepository: Repository<CampaignEntity>,
  ) {}

  async createCamp(dto: CreateCampaignDto) {
    return await this.campsRepository.save(dto);
  }
}