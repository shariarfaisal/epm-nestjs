import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { AdminRole } from './admin-role.enum'


@Entity()
export class Admin extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  contact: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: AdminRole
  })
  role: number;
}
