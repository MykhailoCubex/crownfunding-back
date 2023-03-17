import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { CampaignEntity } from '../../campaigns/entities/campaigns.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ default: 0 })
  amount: number;

  @ManyToOne(() => CampaignEntity, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  campaign?: CampaignEntity;

  @RelationId((user: UserEntity) => user.campaign)
  campaignId?: string;
}
