import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { EmployeeModule } from './employee/employee.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { TimeTrackingModule } from './time-tracking/time-tracking.module';
import { AuthModule } from './auth/auth.module';

const IS_DEV = process.env.NODE_ENV !== 'PRODUCTION';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: IS_DEV,
    }),
    EmployeeModule,
    LocationModule,
    UserModule,
    TimeTrackingModule,
    AuthModule,
  ],
})
export class AppModule {}
