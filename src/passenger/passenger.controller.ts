import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPassengerDto: CreatePassengerDto, @Req() req: any) {
    return this.passengerService.create(createPassengerDto, req.user.id);
  }

  // @Get()
  // findAll() {
  //   return this.passengerService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.passengerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePassengerDto: UpdatePassengerDto) {
  //   return this.passengerService.update(+id, updatePassengerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.passengerService.remove(+id);
  // }
}
