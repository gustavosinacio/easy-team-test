import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  //OneToMany,
} from 'typeorm';

import { Location } from '../location/location.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Location, (location) => location.employees)
  location: Location;

  @Column()
  name: string;

  @Column()
  picture: string;

  //@OneToMany(() => TimeTracking, (timeTracking) => timeTracking.employee)
  //timeTrackings: TimeTracking[];
}
