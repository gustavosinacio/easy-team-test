import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { LocationService } from './location.service';
import { Location } from './location.entity';
import { UpdateLocationSettingsDto } from './dto/update-location-settings.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Location> {
    return this.locationService.findOne(id);
  }

  @Patch(':id/settings')
  async updateLocationSettings(
    @Param('id') id: string,
    @Body() updateDto: UpdateLocationSettingsDto,
  ) {
    return this.locationService.updateLocationSettings(id, updateDto);
  }
}
