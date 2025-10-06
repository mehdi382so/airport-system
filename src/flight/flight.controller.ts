import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFlightDto: CreateFlightDto, @Req() req: any) {
    return this.flightService.create(createFlightDto, req.user.id);
  }

  // @Get()
  // findAll() {
  //   return this.flightService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.flightService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
  //   return this.flightService.update(+id, updateFlightDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.flightService.remove(+id);
  // }
}
