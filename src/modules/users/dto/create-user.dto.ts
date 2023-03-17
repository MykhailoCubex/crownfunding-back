import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nickname: string;

  @IsNumber()
  amount: number;

  @IsString()
  campaignId: string;
}
