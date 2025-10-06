import { Module } from '@nestjs/common';
import { AircraftService } from './aircraft.service';
import { AircraftController } from './aircraft.controller';
import { EmployeeModule } from 'src/employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aircraft } from './entities/aircraft.entity';

@Module({
  imports: [EmployeeModule, TypeOrmModule.forFeature([Aircraft])],
  controllers: [AircraftController],
  providers: [AircraftService],
})
export class AircraftModule {}
