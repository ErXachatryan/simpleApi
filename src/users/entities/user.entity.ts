import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../auth/enums/roles';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surName: string;

  @Column({
    nullable: true,
    default: null,
  })
  middleName: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    enum: Role,
    default: Role.Standard,
  })
  role: Role;
}
