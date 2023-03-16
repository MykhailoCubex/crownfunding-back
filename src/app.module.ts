import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, CampaignsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
