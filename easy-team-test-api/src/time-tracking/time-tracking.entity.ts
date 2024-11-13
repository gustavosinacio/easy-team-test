import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Employee } from '../employee/employee.entity';
import { EVENT_TYPE } from './enums/eventType';

@Entity('time_trackings')
export class TimeTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({
    type: 'enum',
    enum: EVENT_TYPE,
  })
  type: EVENT_TYPE;

  @ManyToOne(() => Employee, (employee) => employee.timeTrackings, {
    nullable: false,
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
