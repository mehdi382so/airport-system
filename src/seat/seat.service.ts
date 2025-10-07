import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { AircraftService } from 'src/aircraft/aircraft.service';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    private readonly employeeService: EmployeeService,
    private readonly aircraftService: AircraftService,
  ) {}

  async create(createSeatDto: CreateSeatDto, userId: number) {
    const { aircraft_id } = createSeatDto;

    const manager = await this.employeeService.findById(userId);
    if (!manager || manager.role !== 'manager')
      throw new ForbiddenException('You can not create seat');

    const aircraft = await this.aircraftService.findOne(aircraft_id);
    if (!aircraft)
      throw new NotFoundException('Aircraft with this id is not found');

    const canManagerSetSearForThisAircraft =
      aircraft.aircraft_id === manager.airline_id;
    if (!canManagerSetSearForThisAircraft)
      throw new ForbiddenException('You can not create seat for this aircraft');

    const aircraftSeatsCount = await this.countSeatByAircraftId(aircraft_id);
    if (aircraftSeatsCount === aircraft.capacity)
      throw new ForbiddenException('Seats are equal to aircraft capacity');

    const isSearNumberDuplicate = await this.findBySeatNumber(
      createSeatDto.number,
    );
    if (isSearNumberDuplicate)
      throw new ConflictException('Seat with this number already exists');

    return this.seatRepository.save(createSeatDto);
  }

  countSeatByAircraftId(aircraft_id: number) {
    return this.seatRepository.count({ where: { aircraft_id } });
  }

  findBySeatNumber(number: string) {
    return this.seatRepository.findOne({ where: { number } });
  }

  // findAll() {
  //   return `This action returns all seat`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} seat`;
  // }

  // update(id: number, updateSeatDto: UpdateSeatDto) {
  //   return `This action updates a #${id} seat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} seat`;
  // }
}
