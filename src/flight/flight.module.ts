import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { RouteModule } from 'src/route/route.module';
import { AircraftModule } from 'src/aircraft/aircraft.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight]),
    EmployeeModule,
    RouteModule,
    AircraftModule,
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
