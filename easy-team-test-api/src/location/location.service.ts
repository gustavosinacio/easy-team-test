import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Location } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find({ relations: ['employees'] });
  }

  async findOne(id: string): Promise<Location> {
    return this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.employees', 'employee')
      .select(['location.id', 'location.name', 'employee.id', 'employee.name'])
      .where('location.id = :id', { id })
      .getOne();
  }
}
