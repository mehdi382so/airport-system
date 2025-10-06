import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { AirportService } from 'src/airport/airport.service';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
    private readonly employeeService: EmployeeService,
    private readonly airportService: AirportService,
  ) {}

  findByOriginAndDestination(origin: number, destination: number) {
    return this.routeRepository.findOne({
      where: { origin_airport_id: origin, destination_airport_id: destination },
    });
  }

  async create(createRouteDto: CreateRouteDto, userId: number) {
    const { origin_airport_id, destination_airport_id } = createRouteDto;
    if (origin_airport_id === destination_airport_id)
      throw new ConflictException(
        'Origin and destination airports must be different',
      );

    const routeExists = await this.findByOriginAndDestination(
      origin_airport_id,
      destination_airport_id,
    );
    if (routeExists) throw new ConflictException('Route already exists');

    const originAirportExists =
      await this.airportService.findOne(origin_airport_id);
    const destinationAirportExists = await this.airportService.findOne(
      destination_airport_id,
    );

    if (!originAirportExists || !destinationAirportExists)
      throw new NotFoundException('Airports not found');

    const manager = await this.employeeService.findById(userId);
    if (!manager) throw new NotFoundException('Manager not found');

    if (manager.role !== 'manager')
      throw new ForbiddenException('You can not create route');

    return this.routeRepository.save(createRouteDto);
  }

  // findAll() {
  //   return `This action returns all route`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} route`;
  // }

  // update(id: number, updateRouteDto: UpdateRouteDto) {
  //   return `This action updates a #${id} route`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} route`;
  // }
}
