import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { JwtModule } from 'src/jwt/jwt.module';
import { AirlineModule } from 'src/airline/airline.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    JwtModule,
    AirlineModule
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
