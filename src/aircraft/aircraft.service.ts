import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Aircraft } from './entities/aircraft.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AircraftService {
  constructor(
    @InjectRepository(Aircraft)
    private readonly aircraftRepository: Repository<Aircraft>,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createAircraftDto: CreateAircraftDto, userId: number) {
    if (userId === -1)
      throw new ForbiddenException('You can not create aircraft');

    const manager = await this.employeeService.findById(userId);
    if (!manager) throw new NotFoundException('Manager not found');

    if (manager.role !== 'manager')
      throw new ForbiddenException('You can not create aircraft');

    const aircraft = {
      ...createAircraftDto,
      airline_id: manager.airline_id,
    };

    return this.aircraftRepository.save(aircraft);
  }

  // findAll() {
  //   return `This action returns all aircraft`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} aircraft`;
  // }

  // update(id: number, updateAircraftDto: UpdateAircraftDto) {
  //   return `This action updates a #${id} aircraft`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} aircraft`;
  // }
}
