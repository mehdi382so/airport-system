import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { RouteService } from 'src/route/route.service';
import { AircraftService } from 'src/aircraft/aircraft.service';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    private readonly employeeService: EmployeeService,
    private readonly routeService: RouteService,
    private readonly aircraftService: AircraftService,
  ) {}

  async create(createFlightDto: CreateFlightDto, userId: number) {
    const { route_id, aircraft_id } = createFlightDto;

    const manager = await this.employeeService.findById(userId);
    if (!manager || manager.role !== 'manager')
      throw new ForbiddenException('You can not create flight');

    const routeExists = await this.routeService.findOne(route_id);
    if (!routeExists) throw new NotFoundException('Route not found');

    const aircraftExists = await this.aircraftService.findOne(aircraft_id);
    if (!aircraftExists) throw new NotFoundException('Aircraft not found');

    const flight = {
      ...createFlightDto,
      airline_id: manager.airline_id,
    };

    return this.flightRepository.save(flight);
  }

  // findAll() {
  //   return `This action returns all flight`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} flight`;
  // }

  // update(id: number, updateFlightDto: UpdateFlightDto) {
  //   return `This action updates a #${id} flight`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} flight`;
  // }
}
