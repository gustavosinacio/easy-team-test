import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/employee.entity';
import { LocationModule } from './location/location.module';
import { Location } from './location/location.entity';
//import { TimeTrackingModule } from './time-tracking/time-tracking.module';

console.log('Database Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.ENV !== 'PRODUCTION',
    }),

    TypeOrmModule.forFeature([Location, Employee]),
    EmployeeModule,
    LocationModule,
  ],
})
export class AppModule {}
