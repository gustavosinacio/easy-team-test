import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Location } from '../location/location.entity';
import { TimeTracking } from '../time-tracking/time-tracking.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Location, (location) => location.employees, { eager: true })
  location: Location;

  @Column()
  name: string;

  @Column()
  picture: string;

  @Column({ default: true })
  timeTrackingEnabled: boolean;

  @OneToMany(() => TimeTracking, (timeTracking) => timeTracking.employee, {
    eager: true,
  })
  timeTrackings: TimeTracking[];
}
