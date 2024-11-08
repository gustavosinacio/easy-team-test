import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  //OneToMany,
} from 'typeorm';

import { Location } from '../location/location.entity';
import { TimeTracking } from 'src/time-tracking/time-tracking.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Location, (location) => location.employees)
  location: Location;

  @Column()
  name: string;

  @Column()
  picture: string;

  @OneToMany(() => TimeTracking, (timeTracking) => timeTracking.employee)
  timeTrackings: TimeTracking[];
}
