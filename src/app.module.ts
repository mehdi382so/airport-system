import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import { AirlineModule } from './airline/airline.module';
import { EmployeeModule } from './employee/employee.module';
import { Airline } from './airline/entities/airline.entity';
import { Employee } from './employee/entities/employee.entity';
import { AirportModule } from './airport/airport.module';
import { Airport } from './airport/entities/airport.entity';
import { AircraftModule } from './aircraft/aircraft.module';
import { Aircraft } from './aircraft/entities/aircraft.entity';
import { RouteModule } from './route/route.module';
import { Route } from './route/entities/route.entity';
import { FlightModule } from './flight/flight.module';
import { Flight } from './flight/entities/flight.entity';
import { SeatModule } from './seat/seat.module';
import { Seat } from './seat/entities/seat.entity';
import { PassengerModule } from './passenger/passenger.module';
import { Passenger } from './passenger/entities/passenger.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          Airline,
          Employee,
          Airport,
          Aircraft,
          Route,
          Flight,
          Seat,
          Passenger,
        ],
        logging: false,
        synchronize: true,
      }),
    }),
    JwtModule,
    AirlineModule,
    EmployeeModule,
    AirportModule,
    AircraftModule,
    RouteModule,
    FlightModule,
    SeatModule,
    PassengerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
