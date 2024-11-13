import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ default: true })
  isGlobalTrackingEnabled: boolean;

  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}
