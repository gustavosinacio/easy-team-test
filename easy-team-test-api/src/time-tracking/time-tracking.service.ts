import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TimeTracking } from './time-tracking.entity';
import { Employee } from '../employee/employee.entity';
import { CreateTimeTrackingDto } from './dto/time-tracking.dto';

@Injectable()
export class TimeTrackingService {
  constructor(
    @InjectRepository(TimeTracking)
    private readonly timeTrackingRepository: Repository<TimeTracking>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createTracking({
    employeeId,
    timestamp,
    type,
  }: CreateTimeTrackingDto): Promise<Partial<TimeTracking>> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const newTimeTracking = this.timeTrackingRepository.create({
      timestamp,
      type,
      employee,
    });

    const { id, timestamp: savedTimestamp } =
      await this.timeTrackingRepository.save(newTimeTracking);

    return { id, timestamp: savedTimestamp, type };
  }

  async getTrackingsByEmployee(employeeId: string): Promise<TimeTracking[]> {
    return this.timeTrackingRepository.find({
      where: { employee: { id: employeeId } },
    });
  }

  async findAll(): Promise<TimeTracking[]> {
    return this.timeTrackingRepository.find();
  }
}
