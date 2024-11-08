import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeTracking } from './time-tracking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeTracking])],
  providers: [],
  controllers: [],
})
export class TimeTrackingModule {}
