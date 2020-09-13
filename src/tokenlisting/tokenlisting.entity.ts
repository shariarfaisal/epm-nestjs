import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TokenListing extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  position: string;

  @Column()
  tokenName: string;

  @Column()
  symbol: string;

  @Column()
  tokenDecimal: string;

  @Column()
  tokenContract: string;

  @Column()
  websiteLink: string;

  @Column()
  description: string;

  @Column()
  logoLink: string;

  @Column()
  exchanges: string;

  @Column()
  twitter: string;

  @Column()
  telegram: string;

  @Column({ nullable: true})
  chat: string;

  @Column({ nullable: true})
  reddit: string;

  @Column()
  members: string;

  @Column()
  channel: string;

  @Column({ nullable: true})
  refferedBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
}
