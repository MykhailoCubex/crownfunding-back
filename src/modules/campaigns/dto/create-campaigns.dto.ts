import { IsEnum, IsNumber, IsString } from 'class-validator';
import { StatusEnum } from '../entities/campaigns.entity';

export class CreateCampaignDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  goal: number;

  @IsEnum(StatusEnum)
  status: StatusEnum;
}
