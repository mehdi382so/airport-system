import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Airline } from './entities/airline.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AirlineService {
  constructor(
    @InjectRepository(Airline)
    private readonly airlineRepository: Repository<Airline>,
  ) {}

  create(createAirlineDto: CreateAirlineDto, userId: number) {
    if (userId !== -1)
      throw new ForbiddenException('You can not create airline');

    return this.airlineRepository.save(createAirlineDto);
  }

  findOne(id: number) {
    return this.airlineRepository.findOne({ where: { airline_id: id } });
  }
  // findAll() {
  //   return `This action returns all airline`;
  // }
  // update(id: number, updateAirlineDto: UpdateAirlineDto) {
  //   return `This action updates a #${id} airline`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} airline`;
  // }
}
