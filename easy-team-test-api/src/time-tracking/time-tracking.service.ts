import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TimeTracking } from './time-tracking.entity';
import { Employee } from '../employee/employee.entity';

@Injectable()
export class TimeTrackingService {
  constructor(
    @InjectRepository(TimeTracking)
    private readonly timeTrackingRepository: Repository<TimeTracking>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createTracking(
    employee_id: number,
    clockIn: Date,
    clockOut: Date,
  ): Promise<TimeTracking> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employee_id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employee_id} not found`);
    }

    console.log(9821, clockIn, clockOut);
    const newTimeTracking = this.timeTrackingRepository.create({
      clockIn,
      clockOut,
      employee,
    });

    return this.timeTrackingRepository.save(newTimeTracking);
  }

  async getTrackingsByEmployee(employeeId: number): Promise<TimeTracking[]> {
    return this.timeTrackingRepository.find({
      where: { employee: { id: employeeId } },
    });
  }

  async findAll(): Promise<TimeTracking[]> {
    return this.timeTrackingRepository.find();
  }
}
