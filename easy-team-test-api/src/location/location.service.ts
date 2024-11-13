import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Location } from './location.entity';
import { Employee } from '../employee/employee.entity';
import { UpdateLocationSettingsDto } from './dto/update-location-settings.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find({ relations: ['employees'] });
  }

  async updateLocationSettings(
    locationId: string,
    { isGlobalTrackingEnabled, employees }: UpdateLocationSettingsDto,
  ): Promise<Location> {
    await this.locationRepository.update(locationId, {
      isGlobalTrackingEnabled,
    });

    const updatePromises = employees.map(({ id, timeTrackingEnabled }) =>
      this.employeeRepository.update(id, { timeTrackingEnabled }),
    );

    await Promise.all(updatePromises);

    return this.locationRepository.findOne({
      where: { id: locationId },
      relations: ['employees'],
    });
  }

  async findOne(id: string): Promise<Location> {
    return this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.employees', 'employee')
      .leftJoinAndSelect('employee.timeTrackings', 'timeTracking')
      .select([
        'location.id',
        'location.name',
        'location.isGlobalTrackingEnabled',
        'employee.id',
        'employee.name',
        'employee.timeTrackingEnabled',
        'timeTracking.id',
        'timeTracking.clockIn',
        'timeTracking.clockOut',
      ])
      .where('location.id = :id', { id })
      .getOne();
  }
}
