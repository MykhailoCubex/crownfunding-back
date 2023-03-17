import { Body, Controller, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaigns.dto';
import { CampaignEntity } from './entities/campaigns.entity';

@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Post('')
  createCamp(@Body() dto: CreateCampaignDto) {
    return this.campaignsService.createCamp(dto);
  }
}
