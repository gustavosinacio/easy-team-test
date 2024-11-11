import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';
import { CreateTimeTrackingDto } from './dto/time-tracking.dto';

@Controller('time-tracking')
export class TimeTrackingController {
  constructor(private readonly timeTrackingService: TimeTrackingService) {}

  @Post()
  async create(@Body() createTimeTrackingDto: CreateTimeTrackingDto) {
    const { employee_id, clockIn, clockOut } = createTimeTrackingDto;
    return this.timeTrackingService.createTracking(
      employee_id,
      clockIn,
      clockOut,
    );
  }

  @Get('/employee/:employeeId')
  async getTrackingsByEmployee(@Param('employeeId') employeeId: string) {
    return this.timeTrackingService.getTrackingsByEmployee(employeeId);
  }
}
