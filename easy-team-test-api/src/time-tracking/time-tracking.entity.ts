import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TimeTracking {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Employee, (employee) => employee.timeTrackings)
  // @JoinColumn({ name: 'employeeId' })
  // employee: Employee;

  @Column()
  clockIn: string;

  @Column()
  clockOut: string;
}
