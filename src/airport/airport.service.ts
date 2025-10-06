import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Airport } from './entities/airport.entity';
import { Repository } from 'typeorm';
import { CreateAirportDto } from './dto/create-airport.dto';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
  ) {}

  create(createAirportDto: CreateAirportDto, userId: number) {
    if (userId !== -1)
      throw new ForbiddenException('You can not create an airport');

    return this.airportRepository.save(createAirportDto);
  }
  // findAll() {
  //   return `This action returns all airport`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} airport`;
  // }
  // update(id: number, updateAirportDto: UpdateAirportDto) {
  //   return `This action updates a #${id} airport`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} airport`;
  // }
}
