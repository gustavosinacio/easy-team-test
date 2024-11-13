import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { USER_ROLE } from './enums/userRole';
import { Employee } from '../employee/employee.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.REGULAR,
  })
  role: USER_ROLE;

  @OneToOne(() => Employee, { eager: true })
  @JoinColumn()
  employee: Employee;
}
