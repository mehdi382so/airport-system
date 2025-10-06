import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { AirportModule } from 'src/airport/airport.module';

@Module({
  imports: [TypeOrmModule.forFeature([Route]), EmployeeModule, AirportModule],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
