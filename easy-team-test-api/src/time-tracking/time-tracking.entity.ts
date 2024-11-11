import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Employee } from '../employee/employee.entity';

@Entity('time-trackings')
export class TimeTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clockIn: Date;

  @Column()
  clockOut: Date;

  @ManyToOne(() => Employee, (employee) => employee.timeTrackings, {
    nullable: false,
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
