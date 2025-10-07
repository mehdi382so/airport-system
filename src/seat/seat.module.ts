import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { AircraftModule } from 'src/aircraft/aircraft.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seat]), EmployeeModule, AircraftModule],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
