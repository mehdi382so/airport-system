import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createPassengerDto: CreatePassengerDto, userId: number) {
    const { passport } = createPassengerDto;

    const staff = await this.employeeService.findById(userId);
    if (!staff || staff.role !== 'staff')
      throw new ForbiddenException('You can not create passenger');

    const isPassportDuplicate = await this.findByPassport(passport);
    if (isPassportDuplicate)
      throw new ConflictException('Passport number already exists');

    return this.passengerRepository.save(createPassengerDto);
  }

  findByPassport(passport: string) {
    return this.passengerRepository.findOne({ where: { passport } });
  }

  // findAll() {
  //   return `This action returns all passenger`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} passenger`;
  // }

  // update(id: number, updatePassengerDto: UpdatePassengerDto) {
  //   return `This action updates a #${id} passenger`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} passenger`;
  // }
}
